import React, { useEffect, useRef, useState } from 'react'
import colormap from './helper/colormap'
import Layer from './image/layer'
import SegmentAnnotator from './helper/segment-annotator'
import util from './helper/util'
import './styles.css'

const labels = ['background', 'sky', 'tree']
const labelColors = [
  [0, 0, 0],
  [0, 0, 255],
  [0, 255, 0],
]

const ImageSeg = ({ imageUrl }) => {
  /**************************************
   ******** Refs
   *************************************/
  const container = useRef()
  const labelsRef = useRef()

  /**************************************
   ******** States
   *************************************/
  const [Annotator, setAnnotator] = useState()
  // const [ImageUrl, setImageUrl] = useState('/images/sky.jpg')
  const [AnnUrl, setAnnUrl] = useState(null)
  const [BoundaryFlashTimeoutID, setBoundaryFlashTimeoutID] = useState(null)
  const [Progress, setProgress] = useState(true)
  const [SelectedLabel, setSelectedLabel] = useState(0)

  /**************************************
   ******** Effects
   *************************************/
  useEffect(() => {
    // setImageUrl('/images/sky.jpg')
    loadImg()
  }, [])

  /**************************************
   ******** Functions
   *************************************/
  const loadImg = () => {
    let params = {}
    params.id = 0

    let image = new Image()
    image.src = imageUrl
    image.onload = img => {
      initAnno(params)

      // container.current.style.width = `${image.width}px`
      // container.current.style.height = `${image.height}px`
    }
  }

  const initAnno = params => {
    let data = {
      labels: labels,
      imageURLs: [imageUrl, null],
      annotationURLs: [AnnUrl, null],
      colormap: labelColors,
    }

    render(data, params)
  }

  const render = (data, params) => {
    const id = params.id

    if (isNaN(id)) throw 'Invalid id'

    const annotator = new SegmentAnnotator(imageUrl, {
      colormap: data.colormap,
      superpixelOptions: { method: 'slic', regionSize: 25 },
      onload: () => {
        setProgress(false)

        if (data.annotationURLs) annotator.import(data.annotationURLs[id])
        boundaryFlash()
      },
    })

    const imageLayer = new Layer(imageUrl)

    setAnnotator(annotator)
    const main = createMainDisplay(params, data, annotator, imageLayer)
    container.current.appendChild(main)
  }

  const createMainDisplay = (params, data, annotator, imageLayer) => {
    let container2 = document.createElement('div')
    let imageContainerSpacer = document.createElement('div')
    let imageContainer = document.createElement('div')
    let annotatorContainer = document.createElement('div')
    let sidebarSpacer = document.createElement('div')
    let sidebarContainer = labelsRef.current

    let sidebar = createSidebar(params, data, annotator)
    imageContainerSpacer.className = 'edit-image-top-menu'
    imageContainer.className = 'edit-image-display'
    imageContainer.appendChild(imageContainerSpacer)
    imageContainer.appendChild(imageLayer.canvas)
    annotatorContainer.className = 'edit-image-display'
    annotatorContainer.appendChild(annotator.container)
    sidebarSpacer.className = 'edit-image-top-menu'
    sidebarContainer.className = 'edit-image-display'
    sidebarContainer.appendChild(sidebarSpacer)
    sidebarContainer.appendChild(sidebar)
    container2.className = 'edit-main-container'
    container2.appendChild(annotatorContainer)
    return container2
  }

  const createSidebar = (params, data, annotator) => {
    let sidebar_container = document.createElement('div'),
      spacer1 = document.createElement('div'),
      undoButton = document.createElement('div'),
      redoButton = document.createElement('div'),
      spacer2 = document.createElement('div'),
      denoiseButton = document.createElement('div'),
      spacer3 = document.createElement('div'),
      superpixelToolButton = document.createElement('div'),
      spacer4 = document.createElement('div'),
      polygonToolButton = document.createElement('div'),
      spacer5 = document.createElement('div'),
      brushToolButton = document.createElement('div'),
      spacer6 = document.createElement('div'),
      manualParagraph = document.createElement('p'),
      spacer7 = document.createElement('div'),
      exportButton = document.createElement('input'),
      manualText

    let labelPicker = createLabelPicker(params, data, annotator)

    exportButton.type = 'submit'
    exportButton.value = 'export'
    exportButton.className = 'edit-sidebar-submit'
    exportButton.addEventListener('click', function() {
      // var filename = data.annotationURLs
      //   ? data.annotationURLs[params.id].split(/[\\/]/).pop()
      //   : params.id + '.png'
      var filename = params.id + '.png'
      downloadURI(annotator.export(), filename)
    })
    spacer1.className = 'edit-sidebar-spacer'
    undoButton.className = 'edit-sidebar-button'
    undoButton.appendChild(document.createTextNode('undo'))
    undoButton.addEventListener('click', function() {
      annotator.undo()
    })
    redoButton.className = 'edit-sidebar-button'
    redoButton.appendChild(document.createTextNode('redo'))
    redoButton.addEventListener('click', function() {
      annotator.redo()
    })
    spacer2.className = 'edit-sidebar-spacer'
    denoiseButton.className = 'edit-sidebar-button'
    denoiseButton.appendChild(document.createTextNode('denoise'))
    denoiseButton.addEventListener('click', function() {
      annotator.denoise()
    })
    superpixelToolButton.className = 'edit-sidebar-button'
    superpixelToolButton.appendChild(document.createTextNode('Superpixel tool'))
    superpixelToolButton.addEventListener('click', function() {
      polygonToolButton.classList.remove('edit-sidebar-button-selected')
      brushToolButton.classList.remove('edit-sidebar-button-selected')
      superpixelToolButton.classList.add('edit-sidebar-button-selected')
      annotator._setMode('superpixel')
    })
    superpixelToolButton.classList.add('edit-sidebar-button-selected')
    polygonToolButton.className = 'edit-sidebar-button'
    polygonToolButton.appendChild(document.createTextNode('Polygon tool'))
    polygonToolButton.addEventListener('click', function() {
      superpixelToolButton.classList.remove('edit-sidebar-button-selected')
      brushToolButton.classList.remove('edit-sidebar-button-selected')
      polygonToolButton.classList.add('edit-sidebar-button-selected')
      annotator._setMode('polygon')
    })

    brushToolButton.classList.add('edit-sidebar-button-selected')
    brushToolButton.className = 'edit-sidebar-button'
    brushToolButton.appendChild(document.createTextNode('Brush tool'))
    brushToolButton.addEventListener('click', function() {
      superpixelToolButton.classList.remove('edit-sidebar-button-selected')
      polygonToolButton.classList.remove('edit-sidebar-button-selected')
      brushToolButton.classList.add('edit-sidebar-button-selected')

      annotator._setMode('brush')
    })

    spacer3.className = 'edit-sidebar-spacer'
    manualParagraph.appendChild(document.createTextNode('ctrl: toggle mode'))
    manualParagraph.appendChild(document.createElement('br'))
    manualParagraph.appendChild(document.createElement('br'))
    manualParagraph.appendChild(document.createTextNode('+Superpixel tool:'))
    manualParagraph.appendChild(document.createElement('br'))
    manualParagraph.appendChild(document.createTextNode('left: mark'))
    manualParagraph.appendChild(document.createElement('br'))
    manualParagraph.appendChild(document.createTextNode('right: pick label'))
    manualParagraph.appendChild(document.createElement('br'))
    manualParagraph.appendChild(document.createElement('br'))
    manualParagraph.appendChild(document.createTextNode('+Polygon tool:'))
    manualParagraph.appendChild(document.createElement('br'))
    manualParagraph.appendChild(document.createTextNode('left: draw line'))
    manualParagraph.appendChild(document.createElement('br'))
    manualParagraph.appendChild(document.createTextNode('right: abort'))
    spacer4.className = 'edit-sidebar-spacer'
    sidebar_container.className = 'edit-sidebar'
    sidebar_container.appendChild(labelPicker)
    sidebar_container.appendChild(spacer1)
    sidebar_container.appendChild(undoButton)
    sidebar_container.appendChild(redoButton)
    sidebar_container.appendChild(spacer2)
    sidebar_container.appendChild(denoiseButton)
    sidebar_container.appendChild(spacer3)
    sidebar_container.appendChild(polygonToolButton)
    sidebar_container.appendChild(superpixelToolButton)
    sidebar_container.appendChild(brushToolButton)
    sidebar_container.appendChild(manualParagraph)
    //sidebar_container.appendChild(spacer4);
    sidebar_container.appendChild(exportButton)
    return sidebar_container
  }

  const downloadURI = (uri, filename) => {
    let anchor = document.createElement('a')
    anchor.style.display = 'none'
    anchor.target = '_blank' // Safari doesn't work.
    anchor.download = filename
    anchor.href = uri
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  const createLabelPicker = (params, data, annotator) => {
    let labelPicker_container = document.createElement('div')
    labelPicker_container.className = 'edit-sidebar-label-picker'

    for (let i = 0; i < data.labels.length; ++i) {
      var labelButton = createLabelButton(data, data.labels[i], i, annotator)
      if (i === 0) {
        annotator.currentLabel = 0
        labelButton.classList.add('edit-sidebar-button-selected')
      }
      labelPicker_container.appendChild(labelButton)
    }
    window.addEventListener('click', cancelPopup, true)
    return labelPicker_container
  }

  const cancelPopup = event => {
    let isOutsidePopup = true,
      target = event.target
    while (target.parentNode) {
      isOutsidePopup =
        isOutsidePopup && !target.classList.contains('edit-sidebar-popup')
      target = target.parentNode
    }
    if (isOutsidePopup) {
      let popups = document.getElementsByClassName('edit-sidebar-popup-active')
      if (popups.length)
        for (let i = 0; i < popups.length; ++i)
          popups[i].classList.remove('edit-sidebar-popup-active')
    }
  }

  const createLabelButton = (data, value, index, annotator) => {
    var colorBox = document.createElement('span'),
      labelText = document.createElement('span'),
      pickButton = document.createElement('div'),
      popupButton = document.createElement('div'),
      popupContainer = document.createElement('div')
    colorBox.className = 'edit-sidebar-legend-colorbox'
    colorBox.style.backgroundColor =
      'rgb(' + data.colormap[index].join(',') + ')'
    labelText.appendChild(document.createTextNode(value))
    labelText.className = 'edit-sidebar-legend-label'
    popupButton.appendChild(document.createTextNode('+'))
    popupButton.className = 'edit-sidebar-popup-trigger'
    popupButton.addEventListener('click', function() {
      popupContainer.classList.toggle('edit-sidebar-popup-active')
    })
    popupContainer.className = 'edit-sidebar-popup'
    popupContainer.appendChild(
      createRelabelSelector(data, index, annotator, popupContainer)
    )
    popupContainer.addEventListener('click', function(event) {
      event.preventDefault()
    })
    pickButton.appendChild(colorBox)
    pickButton.appendChild(labelText)
    pickButton.appendChild(popupButton)
    pickButton.appendChild(popupContainer)
    pickButton.id = 'label-' + index + '-button'
    pickButton.className = 'edit-sidebar-button'
    pickButton.addEventListener('click', function() {
      var className = 'edit-sidebar-button-selected'
      annotator.currentLabel = index
      var selectedElements = document.getElementsByClassName(className)
      for (var i = 0; i < selectedElements.length; ++i)
        selectedElements[i].classList.remove(className)
      pickButton.classList.add(className)
    })
    pickButton.addEventListener('mouseenter', function() {
      if (!document.getElementsByClassName('edit-sidebar-popup-active').length)
        annotator.highlightLabel(index)
    })
    pickButton.addEventListener('mouseleave', function() {
      if (!document.getElementsByClassName('edit-sidebar-popup-active').length)
        annotator.unhighlightLabel()
    })
    return pickButton
  }

  const createRelabelSelector = (data, index, annotator, popupContainer) => {
    let select = document.createElement('select'),
      firstOption = document.createElement('option')
    firstOption.appendChild(document.createTextNode('Change to'))
    select.appendChild(firstOption)
    for (let i = 0; i < data.labels.length; ++i) {
      if (i !== index) {
        let option = document.createElement('option')
        option.value = i
        option.appendChild(document.createTextNode(data.labels[i]))
        select.appendChild(option)
      }
    }
    select.addEventListener('change', function(event) {
      let sourceLabel = index
      let targetLabel = parseInt(event.target.value, 10)
      if (sourceLabel !== targetLabel) {
        let currentLabel = annotator.currentLabel
        annotator.currentLabel = targetLabel
        annotator.fill(sourceLabel)
        annotator.currentLabel = currentLabel
      }
      popupContainer.classList.remove('edit-sidebar-popup-active')
      firstOption.selected = true
      event.preventDefault()
    })
    return select
  }

  const boundaryFlash = () => {
    // var boundaryButton = document.getElementById('boundary-button')
    // if (BoundaryFlashTimeoutID) {
    //   window.clearTimeout(BoundaryFlashTimeoutID)
    //   setBoundaryFlashTimeoutID(
    //     window.setTimeout(function() {
    //       boundaryButton.click()
    //       // BoundaryFlashTimeoutID = null
    //       setBoundaryFlashTimeoutID(null)
    //     }, 1000)
    //   )
    // }
    // // else if (
    // //   !boundaryButton.current.classList.contains('edit-image-top-button-enabled')
    // // )
    // else {
    //   boundaryButton.click()
    //   setBoundaryFlashTimeoutID(
    //     window.setTimeout(function() {
    //       boundaryButton.click()
    //       // BoundaryFlashTimeoutID = null
    //       setBoundaryFlashTimeoutID(null)
    //     }, 1000)
    //   )
    // }
  }

  /**************************************
   ******** Render
   *************************************/
  return (
    <>
      <button id='boundary-button' hidden>
        boundary button
      </button>

      <div>
        <button onClick={() => Annotator.undo()}>undo</button>
        <button onClick={() => Annotator.redo()}>redo</button>
        <select>
          <option value=''></option>
        </select>
      </div>

      <div>
        <button onClick={() => Annotator.finer()}>finer +</button>
        <button onClick={() => Annotator.coarser()}>coarser -</button>
      </div>

      <div ref={labelsRef}></div>

      <div style={{ maxWidth: '100vw' }} ref={container}></div>
    </>
  )
}

export default ImageSeg
