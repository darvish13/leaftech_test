<template>
  <v-app style="background-color: rgb(33, 33, 33); color: white">
    <v-progress-linear
      v-if="progress"
      indeterminate
      color="yellow darken-2"
    ></v-progress-linear>
    <div style="text-align: center; width: 100%">
      <v-btn class="btn" plain @click="onUndo">
        <v-icon>mdi-undo</v-icon>
      </v-btn>
      <v-btn class="btn" plain @click="onRedo">
        <v-icon>mdi-redo</v-icon>
      </v-btn>

      <v-menu offset-y dense>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="btn"
            plain
            v-bind="attrs"
            v-on="on"
            style="background-color: none"
          >
            <v-icon
              style="background-color: none"
              :color="`rgb(${labelColors[labelSelected][0]}, ${labelColors[labelSelected][1]}, ${labelColors[labelSelected][2]})`"
              >mdi-circle</v-icon
            >
            {{ labels[labelSelected] }}
            <!-- <v-icon>mdi-layers-triple</v-icon> -->
          </v-btn>
        </template>
        <v-list dense style="background-color: rgb(55, 55, 55)">
          <v-list-item
            style="color: white; background-color: transparent"
            v-for="(l, index) in labels"
            :key="index"
            @click="onLabelChange(index)"
            @mouseenter="onLabelMouseEnter(index)"
            @mouseleave="onLabelMouseLeave(index)"
          >
            <v-list-item-icon class="btn" style="background-color: transparent">
              <v-icon
                :color="`rgb(${labelColors[index][0]}, ${labelColors[index][1]}, ${labelColors[index][2]})`"
                >mdi-circle</v-icon
              >
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ l }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="btn" plain v-bind="attrs" v-on="on">
            {{ tools[toolSelected] }}
            <v-icon>mdi-hammer-wrench</v-icon>
          </v-btn>
        </template>
        <v-list dense style="background-color: rgb(55, 55, 55)">
          <v-list-item
            style="color: white"
            v-for="(t, index) in tools"
            :key="index"
            @click="onToolChange(index)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ tools[index] }}</v-list-item-title>
            
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> -->

      <!-- <v-btn class="btn" plain @click="onDenoise"> denoise </v-btn> -->
      <v-btn class="btn" plain @click="onSave">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </div>

    <div>
      <div style="text-align: center; width: 100%">
        <div style="break-inside: avoid">
          <v-btn class="btn" plain ref="zoomIn" @click="onZoomOut">
            <v-icon>mdi-minus</v-icon>
            Zoom
          </v-btn>
          <v-btn class="btn" plain ref="zoomOut" @click="onZoomIn">
            <v-icon>mdi-plus</v-icon>
            Zoom
          </v-btn>
        </div>

        <div style="margin: 0 10px 0 10px; break-inside: avoid">
          <v-btn class="btn" plain ref="finer" @click="onFiner">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn class="btn" plain ref="boundary" @click="onBoundary">
            Boundary
          </v-btn>
          <v-btn class="btn" plain ref="coarser" @click="onCoarser">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>

        <!-- <div style="break-inside: avoid">
          <v-btn class="btn" plain ref="alphaMinus" @click="onAlphaMinus">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn class="btn" plain ref="image" @click="onImage"> Image </v-btn>
          <v-btn class="btn" plain ref="alphaPlus" @click="onAlphaPlus">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div> -->
      </div>
    </div>

    <v-navigation-drawer
      hidden
      style="width: 70px; display: none"
      absolute
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->

          <v-list-item-content>
            <v-list-item-title>labels</v-list-item-title>
            <div ref="labels"></div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="text-align: center">
      <div
        ref="container"
        style="
          overflow: scroll;
          width: 600px;
          height: 400px;
          margin: 0px;
          display: inline-block;
        "
      ></div>
    </v-main>

    <v-snackbar v-model="snackbar" timeout="2000">
      {{ msg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import editPage from "./app/edit";
import colormap from "./helper/colormap";
import Layer from "./image/layer";
import Annotator from "./helper/segment-annotator";
import util from "./helper/util";

import api from "../API";
export default {
  data: () => ({
    id: null,
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    mini: true,

    boundaryFlashTimeoutID: null,

    imgURL: "test.png",
    annURL: null,
    labels: ["background", "sky", "tree"],
    labelSelected: 0,
    labelColors: [
      [0, 0, 0],
      [0, 0, 255],
      [0, 255, 0],

    ],

    annotator: null,
    image: true,
    boundary: true,
    tools: ["superpixel"/*, "polygon", "brush"*/],
    toolSelected: 0,
    highlighted: null,

    snackbar: false,
    msg: null,
    progress: true,
  }),

  beforeCreate() {
    this.progress = true;
  },

  mounted() {
    let test = false;
    if (!test) {
      this.id = this.$route.params.id;
      this.imgURL = api.getImgURL(this.id);
      this.annURL = api.getAnnURL(this.id);
    } else {
      this.imgURL = "/test.png";
    }
    this.loadImg();
  },


  methods: {
    loadImg() {
      let params = {};
      params.id = 0;
      let img = new Image();
      img.src = this.imgURL;
      img.onload = (i) => {
        console.log(i);
        // params.width = window.innerWidth * 0.9;
        // params.height = (img.height * window.innerWidth * 0.9) / img.width;
        this.initAnno(params);
        let w = window.innerWidth * 0.85
        this.$refs.container.style.width = w + 'px'
        this.$refs.container.style.height = (img.height * w/img.width)+ 'px'
        this.annotator.zoom(w*0.97/img.width)
      };
    },

    initAnno(params) {
      // Create a colormap for display. The following is an example.
      function createColormap(label, labels) {
        return label
          ? colormap.create("single", {
              size: labels.length,
              index: labels.indexOf(label),
            })
          : [
              [0, 0, 0],
              [0, 0, 255],
              [64, 32, 32],
            ].concat(
              colormap.create("hsv", {
                size: labels.length - 3,
              })
            );
      }

      let data = {
        labels: this.labels,
        imageURLs: [this.imgURL, null],
        annotationURLs: [this.annURL, null],
      };
      // data.colormap = createColormap(params.label, data.labels);
      data.colormap = this.labelColors
      // editPage(data, params);
      this.labelColors = data.colormap;
      console.log(this.labelColors);
      this.render(data, params);
    },

    onLabelChange(l) {
      this.labelSelected = l;
      this.annotator.currentLabel = l;
    },
    onToolChange(t) {
      this.toolSelected = t;
      this.annotator._setMode(this.tools[t]);
    },
    onUndo() {
      this.annotator.undo();
    },
    onRedo() {
      this.annotator.redo();
    },
    onDenoise() {
      this.annotator.denoise();
    },
    onZoomIn() {
      this.annotator.zoomIn();
    },
    onZoomOut() {
      this.annotator.zoomOut();
    },
    onBoundary() {
      if (this.boundary) {
        this.annotator.hide("boundary");
        this.boundary = false;
      } else {
        this.annotator.show("boundary");
        this.boundary = true;
      }
    },
    onFiner() {
      this.annotator.finer();
      this.boundaryFlash();
    },
    onCoarser() {
      this.annotator.coarser();
      this.boundaryFlash();
    },
    onImage() {
      if (this.image) {
        this.annotator.hide("image");
        this.image = false;
      } else {
        this.annotator.show("image");
        this.image = true;
      }
    },
    onAlphaMinus() {
      this.annotator.lessAlpha();
    },
    onAlphaPlus() {
      this.annotator.moreAlpha();
    },
    onLabelMouseEnter(l) {
      this.annotator.highlightLabel(l);
    },
    onLabelMouseLeave(l) {
      this.annotator.unhighlightLabel(l);
    },
    onSave() {
      this.progress = true;
      let data = this.annotator.export();
      window.fff = data;
      //this.downloadURI(data, "ann.png");
      data = data.substring(data.indexOf(",") + 1);
      api
        .saveAnn(this.id, data.toString())
        .then(() => {
          this.saveSuccess();
        })
        .catch((err) => {
          this.saveFail(err);
        });
    },
    saveSuccess() {
      this.progress = false;
      this.msg = "saved";
      this.snackbar = true;
    },
    saveFail(e) {
      this.progress = false;
      this.msg = e;
      this.snackbar = true;
    },
    /////////////////////////////////////////

    // Create the navigation menu.
    createNavigationMenu(params, data, annotator) {
      var navigationMenu = document.createElement("p"),
        navigation = this.createNavigation(params, data),
        idBlock = document.createElement("div");
      idBlock.className = "edit-top-menu-block";
      idBlock.appendChild(document.createTextNode(" ID = " + params.id));
      navigationMenu.appendChild(navigation);
      navigationMenu.appendChild(idBlock);
      return navigationMenu;
    },

    // Create the page navigation.
    createNavigation(params, data) {
      var id = parseInt(params.id, 10),
        container = document.createElement("div"),
        indexAnchor = document.createElement("a"),
        indexAnchorText = document.createTextNode("Index"),
        prevAnchorText = document.createTextNode("Prev"),
        nextAnchorText = document.createTextNode("Next"),
        prevAnchor,
        nextAnchor;
      indexAnchor.href = util.makeQueryParams({ view: "index" });
      indexAnchor.appendChild(indexAnchorText);
      if (id > 0) {
        prevAnchor = document.createElement("a");
        prevAnchor.appendChild(prevAnchorText);
        prevAnchor.href = util.makeQueryParams(params, {
          id: id - 1,
        });
      } else prevAnchor = prevAnchorText;
      if (id < data.imageURLs.length - 1) {
        nextAnchor = document.createElement("a");
        nextAnchor.appendChild(nextAnchorText);
        nextAnchor.href = util.makeQueryParams(params, {
          id: id + 1,
        });
      } else nextAnchor = nextAnchorText;
      container.appendChild(prevAnchor);
      container.appendChild(document.createTextNode(" "));
      container.appendChild(indexAnchor);
      container.appendChild(document.createTextNode(" "));
      container.appendChild(nextAnchor);
      container.classList.add("edit-top-menu-block");
      return container;
    },

    // Create the main content block.
    createMainDisplay(params, data, annotator, imageLayer) {
      var container = document.createElement("div"),
        imageContainerSpacer = document.createElement("div"),
        imageContainer = document.createElement("div"),
        //annotatorTopMenu = this.createImageTopMenu(params, data, annotator),
        annotatorContainer = document.createElement("div"),
        sidebarSpacer = document.createElement("div"),
        // sidebarContainer = document.createElement("div"),
        sidebarContainer = this.$refs.labels,
        sidebar = this.createSidebar(params, data, annotator);
      imageContainerSpacer.className = "edit-image-top-menu";
      imageContainer.className = "edit-image-display";
      imageContainer.appendChild(imageContainerSpacer);
      imageContainer.appendChild(imageLayer.canvas);
      annotatorContainer.className = "edit-image-display";
      // annotatorContainer.appendChild(annotatorTopMenu);
      annotatorContainer.appendChild(annotator.container);
      sidebarSpacer.className = "edit-image-top-menu";
      sidebarContainer.className = "edit-image-display";
      sidebarContainer.appendChild(sidebarSpacer);
      sidebarContainer.appendChild(sidebar);
      container.className = "edit-main-container";
      // container.appendChild(imageContainer);
      container.appendChild(annotatorContainer);
      // container.appendChild(sidebarContainer);
      return container;
    },

    // Create the menu above the editor.
    createImageTopMenu(params, data, annotator) {
      var container = document.createElement("div"),
        //zoomOutButton = document.createElement("div"),
        zoomOutButton = this.$refs.zoomOut.$el,
        // zoomInButton = document.createElement("div"),
        zoomInButton = this.$refs.zoomIn.$el,
        spacer1 = document.createElement("span"),
        // finerButton = document.createElement("div"),
        finerButton = this.$refs.finer.$el,
        // boundaryButton = document.createElement("div"),
        boundaryButton = this.$refs.boundary.$el,
        // coarserButton = document.createElement("div"),
        coarserButton = this.$refs.coarser.$el,
        spacer2 = document.createElement("span"),
        // alphaMinusButton = document.createElement("div"),
        alphaMinusButton = this.$refs.alphaMinus.$el,
        // imageButton = document.createElement("div"),
        imageButton = this.$refs.image.$el,
        // alphaPlusButton = document.createElement("div");
        alphaPlusButton = this.$refs.alphaPlus.$el;

      // zoomOutButton = document.createElement("div");
      // zoomOutButton.appendChild(document.createTextNode("-"));
      zoomOutButton.classList.add("edit-image-top-button");
      zoomOutButton.addEventListener("click", function () {
        annotator.zoomOut();
      });
      // zoomInButton.appendChild(document.createTextNode("zoom +"));
      zoomInButton.classList.add("edit-image-top-button");
      zoomInButton.addEventListener("click", function () {
        annotator.zoomIn();
      });
      spacer1.className = "edit-image-top-spacer";
      // boundaryButton.id = "boundary-button";
      boundaryButton.className = "edit-image-top-button";
      // boundaryButton.appendChild(document.createTextNode("boundary"));
      boundaryButton.addEventListener("click", function () {
        if (this.boundaryFlashTimeoutID)
          window.clearTimeout(this.boundaryFlashTimeoutID);
        if (boundaryButton.classList.contains("edit-image-top-button-enabled"))
          annotator.hide("boundary");
        else annotator.show("boundary");
        boundaryButton.classList.toggle("edit-image-top-button-enabled");
      });
      // finerButton.appendChild(document.createTextNode("-"));
      finerButton.className = "edit-image-top-button";
      finerButton.addEventListener("click", function () {
        annotator.finer();
        this.boundaryFlash();
      });
      // coarserButton.appendChild(document.createTextNode("+"));
      coarserButton.className = "edit-image-top-button";
      coarserButton.addEventListener("click", function () {
        annotator.coarser();
        this.boundaryFlash();
      });
      spacer2.className = "edit-image-top-spacer";
      alphaMinusButton.className = "edit-image-top-button";
      // alphaMinusButton.appendChild(document.createTextNode("-"));
      alphaMinusButton.addEventListener("click", function () {
        annotator.moreAlpha();
      });
      imageButton.className =
        "edit-image-top-button " + "edit-image-top-button-enabled";
      // imageButton.appendChild(document.createTextNode("image"));
      imageButton.addEventListener("click", function () {
        if (imageButton.classList.contains("edit-image-top-button-enabled"))
          annotator.hide("image");
        else annotator.show("image");
        imageButton.classList.toggle("edit-image-top-button-enabled");
      });
      alphaPlusButton.className = "edit-image-top-button";
      // alphaPlusButton.appendChild(document.createTextNode("+"));
      alphaPlusButton.addEventListener("click", function () {
        annotator.lessAlpha();
      });
      //
      container.className = "edit-image-top-menu";
      // container.appendChild(zoomOutButton);
      // container.appendChild(zoomInButton);
      // container.appendChild(spacer1);
      // container.appendChild(finerButton);
      // container.appendChild(boundaryButton);
      // container.appendChild(coarserButton);
      // container.appendChild(spacer2);
      // container.appendChild(alphaMinusButton);
      // container.appendChild(imageButton);
      // container.appendChild(alphaPlusButton);
      return container;
    },

    // Set up the automatic flash of boundary.
    boundaryFlash() {
      // var boundaryButton = document.getElementById("boundary-button");
      var boundaryButton = this.$refs.$el;

      if (this.boundaryFlashTimeoutID) {
        window.clearTimeout(this.boundaryFlashTimeoutID);
        this.boundaryFlashTimeoutID = window.setTimeout(function () {
          boundaryButton.click();
          this.boundaryFlashTimeoutID = null;
        }, 1000);
      } else if (
        !boundaryButton.classList.contains("edit-image-top-button-enabled")
      ) {
        boundaryButton.click();
        this.boundaryFlashTimeoutID = window.setTimeout(function () {
          boundaryButton.click();
          this.boundaryFlashTimeoutID = null;
        }, 1000);
      }
    },

    // Create the sidebar.
    createSidebar(params, data, annotator) {
      var container = document.createElement("div"),
        labelPicker = this.createLabelPicker(params, data, annotator),
        spacer1 = document.createElement("div"),
        undoButton = document.createElement("div"),
        redoButton = document.createElement("div"),
        spacer2 = document.createElement("div"),
        denoiseButton = document.createElement("div"),
        spacer3 = document.createElement("div"),
        superpixelToolButton = document.createElement("div"),
        spacer4 = document.createElement("div"),
        polygonToolButton = document.createElement("div"),
        spacer5 = document.createElement("div"),
        brushToolButton = document.createElement("div"),
        spacer6 = document.createElement("div"),
        manualParagraph = document.createElement("p"),
        spacer7 = document.createElement("div"),
        exportButton = document.createElement("input"),
        manualText;
      exportButton.type = "submit";
      exportButton.value = "export";
      exportButton.className = "edit-sidebar-submit";
      exportButton.addEventListener("click", function () {
        var filename = data.annotationURLs
          ? data.annotationURLs[params.id].split(/[\\/]/).pop()
          : params.id + ".png";
        this.downloadURI(annotator.export(), filename);
      });
      spacer1.className = "edit-sidebar-spacer";
      undoButton.className = "edit-sidebar-button";
      undoButton.appendChild(document.createTextNode("undo"));
      undoButton.addEventListener("click", function () {
        annotator.undo();
      });
      redoButton.className = "edit-sidebar-button";
      redoButton.appendChild(document.createTextNode("redo"));
      redoButton.addEventListener("click", function () {
        annotator.redo();
      });
      spacer2.className = "edit-sidebar-spacer";
      denoiseButton.className = "edit-sidebar-button";
      denoiseButton.appendChild(document.createTextNode("denoise"));
      denoiseButton.addEventListener("click", function () {
        annotator.denoise();
      });
      superpixelToolButton.className = "edit-sidebar-button";
      superpixelToolButton.appendChild(
        document.createTextNode("Superpixel tool")
      );
      superpixelToolButton.addEventListener("click", function () {
        polygonToolButton.classList.remove("edit-sidebar-button-selected");
        brushToolButton.classList.remove("edit-sidebar-button-selected");
        superpixelToolButton.classList.add("edit-sidebar-button-selected");
        annotator._setMode("superpixel");
      });
      superpixelToolButton.classList.add("edit-sidebar-button-selected");
      polygonToolButton.className = "edit-sidebar-button";
      polygonToolButton.appendChild(document.createTextNode("Polygon tool"));
      polygonToolButton.addEventListener("click", function () {
        superpixelToolButton.classList.remove("edit-sidebar-button-selected");
        brushToolButton.classList.remove("edit-sidebar-button-selected");
        polygonToolButton.classList.add("edit-sidebar-button-selected");
        annotator._setMode("polygon");
      });

      brushToolButton.classList.add("edit-sidebar-button-selected");
      brushToolButton.className = "edit-sidebar-button";
      brushToolButton.appendChild(document.createTextNode("Brush tool"));
      brushToolButton.addEventListener("click", function () {
        superpixelToolButton.classList.remove("edit-sidebar-button-selected");
        polygonToolButton.classList.remove("edit-sidebar-button-selected");
        brushToolButton.classList.add("edit-sidebar-button-selected");

        annotator._setMode("brush");
      });

      spacer3.className = "edit-sidebar-spacer";
      manualParagraph.appendChild(document.createTextNode("ctrl: toggle mode"));
      manualParagraph.appendChild(document.createElement("br"));
      manualParagraph.appendChild(document.createElement("br"));
      manualParagraph.appendChild(document.createTextNode("+Superpixel tool:"));
      manualParagraph.appendChild(document.createElement("br"));
      manualParagraph.appendChild(document.createTextNode("left: mark"));
      manualParagraph.appendChild(document.createElement("br"));
      manualParagraph.appendChild(document.createTextNode("right: pick label"));
      manualParagraph.appendChild(document.createElement("br"));
      manualParagraph.appendChild(document.createElement("br"));
      manualParagraph.appendChild(document.createTextNode("+Polygon tool:"));
      manualParagraph.appendChild(document.createElement("br"));
      manualParagraph.appendChild(document.createTextNode("left: draw line"));
      manualParagraph.appendChild(document.createElement("br"));
      manualParagraph.appendChild(document.createTextNode("right: abort"));
      spacer4.className = "edit-sidebar-spacer";
      container.className = "edit-sidebar";
      container.appendChild(labelPicker);
      container.appendChild(spacer1);
      container.appendChild(undoButton);
      container.appendChild(redoButton);
      container.appendChild(spacer2);
      container.appendChild(denoiseButton);
      container.appendChild(spacer3);
      container.appendChild(polygonToolButton);
      container.appendChild(superpixelToolButton);
      container.appendChild(brushToolButton);
      container.appendChild(manualParagraph);
      //container.appendChild(spacer4);
      container.appendChild(exportButton);
      return container;
    },

    createLabelButton(data, value, index, annotator) {
      var colorBox = document.createElement("span"),
        labelText = document.createElement("span"),
        pickButton = document.createElement("div"),
        popupButton = document.createElement("div"),
        popupContainer = document.createElement("div");
      colorBox.className = "edit-sidebar-legend-colorbox";
      colorBox.style.backgroundColor =
        "rgb(" + data.colormap[index].join(",") + ")";
      labelText.appendChild(document.createTextNode(value));
      labelText.className = "edit-sidebar-legend-label";
      popupButton.appendChild(document.createTextNode("+"));
      popupButton.className = "edit-sidebar-popup-trigger";
      popupButton.addEventListener("click", function () {
        popupContainer.classList.toggle("edit-sidebar-popup-active");
      });
      popupContainer.className = "edit-sidebar-popup";
      popupContainer.appendChild(
        this.createRelabelSelector(data, index, annotator, popupContainer)
      );
      popupContainer.addEventListener("click", function (event) {
        event.preventDefault();
      });
      pickButton.appendChild(colorBox);
      pickButton.appendChild(labelText);
      pickButton.appendChild(popupButton);
      pickButton.appendChild(popupContainer);
      pickButton.id = "label-" + index + "-button";
      pickButton.className = "edit-sidebar-button";
      pickButton.addEventListener("click", function () {
        var className = "edit-sidebar-button-selected";
        annotator.currentLabel = index;
        var selectedElements = document.getElementsByClassName(className);
        for (var i = 0; i < selectedElements.length; ++i)
          selectedElements[i].classList.remove(className);
        pickButton.classList.add(className);
      });
      pickButton.addEventListener("mouseenter", function () {
        if (
          !document.getElementsByClassName("edit-sidebar-popup-active").length
        )
          annotator.highlightLabel(index);
      });
      pickButton.addEventListener("mouseleave", function () {
        if (
          !document.getElementsByClassName("edit-sidebar-popup-active").length
        )
          annotator.unhighlightLabel();
      });
      return pickButton;
    },

    init() {
      // Write the brush tool
      Annotator.prototype.brush = function (pos, label) {
        var offsets = [],
          labels = [];
        for (var y = -2; y <= 2; y++) {
          for (var x = -2; x <= 2; x++) {
            // it is circle bitches
            if (x * x + y * y > 7) continue;
            var offset =
              4 *
              ((pos[1] + y) * this.layers.visualization.canvas.width +
                (pos[0] + x));
            offsets.push(offset);
            labels.push(label);
          }
        }
        this._updateAnnotation(offsets, labels);
        this.layers.visualization.render();
        if (typeof this.onchange === "function") this.onchange.call(this);
      };
    },

    // Hightlight legend labels.
    highlightLabel(label) {
      var highlightClass = "edit-sidebar-button-highlight",
        elements = document.getElementsByClassName(highlightClass);
      for (var i = 0; i < elements.length; ++i)
        elements[i].classList.remove(highlightClass);
      var pickButton = document.getElementById("label-" + label + "-button");
      if (pickButton) pickButton.classList.add(highlightClass);
    },

    // Create the label picker button.
    createLabelPicker(params, data, annotator) {
      var container = document.createElement("div");
      container.className = "edit-sidebar-label-picker";
      for (var i = 0; i < data.labels.length; ++i) {
        var labelButton = this.createLabelButton(
          data,
          data.labels[i],
          i,
          annotator
        );
        if (i === 0) {
          annotator.currentLabel = 0;
          labelButton.classList.add("edit-sidebar-button-selected");
        }
        container.appendChild(labelButton);
      }
      window.addEventListener("click", this.cancelPopup, true);
      return container;
    },

    // Cancel popup.
    cancelPopup(event) {
      var isOutsidePopup = true,
        target = event.target;
      while (target.parentNode) {
        isOutsidePopup =
          isOutsidePopup && !target.classList.contains("edit-sidebar-popup");
        target = target.parentNode;
      }
      if (isOutsidePopup) {
        var popups = document.getElementsByClassName(
          "edit-sidebar-popup-active"
        );
        if (popups.length)
          for (var i = 0; i < popups.length; ++i)
            popups[i].classList.remove("edit-sidebar-popup-active");
      }
    },

    // Create the relabel selector.
    createRelabelSelector(data, index, annotator, popupContainer) {
      var select = document.createElement("select"),
        firstOption = document.createElement("option");
      firstOption.appendChild(document.createTextNode("Change to"));
      select.appendChild(firstOption);
      for (var i = 0; i < data.labels.length; ++i) {
        if (i !== index) {
          var option = document.createElement("option");
          option.value = i;
          option.appendChild(document.createTextNode(data.labels[i]));
          select.appendChild(option);
        }
      }
      select.addEventListener("change", function (event) {
        var sourceLabel = index;
        var targetLabel = parseInt(event.target.value, 10);
        if (sourceLabel !== targetLabel) {
          var currentLabel = annotator.currentLabel;
          annotator.currentLabel = targetLabel;
          annotator.fill(sourceLabel);
          annotator.currentLabel = currentLabel;
        }
        popupContainer.classList.remove("edit-sidebar-popup-active");
        firstOption.selected = true;
        event.preventDefault();
      });
      return select;
    },

    // Download trick.
    downloadURI(uri, filename) {
      var anchor = document.createElement("a");
      anchor.style.display = "none";
      anchor.target = "_blank"; // Safari doesn't work.
      anchor.download = filename;
      anchor.href = uri;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    },

    // Entry point.
    render(data, params) {
      var id = params.id;
      if (isNaN(id)) throw "Invalid id";
      var annotator = new Annotator(data.imageURLs[id], {
          width: params.width,
          height: params.height,
          colormap: data.colormap,
          superpixelOptions: { method: "slic", regionSize: 25 },
          onload: () => {
            this.progress = false;
            if (data.annotationURLs) annotator.import(data.annotationURLs[id]);
            ///annotator.hide("boundary");
            this.boundaryFlash();
          },
          onchange: function () {
            var activeLabels = this.getUniqueLabels(),
              legendClass = "edit-sidebar-legend-label",
              legendActiveClass = "edit-sidebar-legend-label-active",
              elements = document.getElementsByClassName(legendClass),
              i;
            for (i = 0; i < elements.length; ++i)
              elements[i].classList.remove(legendActiveClass);
            for (i = 0; i < activeLabels.length; ++i)
              elements[activeLabels[i]].classList.add(legendActiveClass);
          },
          onrightclick: function (label) {
            document.getElementById("label-" + label + "-button").click();
          },
          onmousemove: this.highlightLabel,
        }),
        imageLayer = new Layer(data.imageURLs[id], {
          width: params.width,
          height: params.height,
        });
      // this.$refs.container.appendChild(
      //   this.createNavigationMenu(params, data, annotator)
      // );
      this.annotator = annotator;
      var main = this.createMainDisplay(params, data, annotator, imageLayer);
      this.$refs.container.appendChild(main);
    },
  },
};
</script>

<style>
.segment-viewer-overlay-container {
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  display: inline-block;
  left: 0;
  position: absolute;
  top: 0;
}
.segment-viewer-legend-container {
  display: inline-block;
  bottom: 0;
  position: absolute;
  right: 0;
}
.segment-viewer-legend-item {
  font-family: monospace;
  font-size: small;
  white-space: nowrap;
}
.segment-viewer-legend-label {
  color: gray;
}
.segment-viewer-legend-colorbox {
  background-color: white;
  border: 1px solid gray;
  display: inline-block;
  height: 0.7em;
  vertical-align: middle;
  width: 0.7em;
}
.segment-viewer-container {
  background-color: gray;
  display: inline-block;
  position: relative;
}
.segment-viewer-layer {
  left: 0;
  position: absolute;
  top: 0;
  zoom: 1;
  -moz-transform: scale(1);
}
.segment-annotator-outer-container {
  display: inline-block;
  /* overflow: auto;
  -webkit-overflow-scrolling: touch; */
  /* width: 700px !important;
  height: 500px !important; */
}
.segment-annotator-inner-container {
  background-color: #ccc;
  position: relative;
  zoom: 1;
  -moz-transform: scale(1);
  -moz-transform-origin: top left;
}
.segment-annotator-layer {
  left: 0;
  position: absolute;
  top: 0;
  cursor: pointer;
}
/* .edit-sidebar {
  font-family: monospace;
}
.edit-sidebar p {
  padding: 0 0.5em;
  width: 100%;
}
.edit-sidebar-button {
  position: relative;
  background-color: #eee;
  cursor: pointer;
  padding-left: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.edit-sidebar-button:hover {
  background-color: #aaa;
}
.edit-sidebar-button-selected,
.edit-sidebar-button-enabled {
  background-color: #ccc;
}
.edit-sidebar-button-highlight {
  background-color: #aaa;
}
.edit-sidebar-legend-colorbox {
  background-color: white;
  border: 1px solid gray;
  display: inline-block;
  height: 0.7em;
  vertical-align: middle;
  width: 0.7em;
}
.edit-sidebar-legend-label {
  color: gray;
  display: inline-block;
  width: 10em;
  padding: 0 0.3em;
}
.edit-sidebar-legend-label-active {
  color: black;
  font-weight: bold;
}
.edit-sidebar-popup-trigger {
  display: inline-block;
  position: relative;
  min-width: 1em;
  text-align: center;
  background-color: #ddd;
}
.edit-sidebar-popup-trigger:hover {
  background-color: #999;
}
.edit-sidebar-popup {
  display: none;
  position: absolute;
  top: 1em;
  right: 0;
  padding: 0.1em 0.3em;
  background-color: #ccc;
  z-index: 1;
}
.edit-sidebar-popup-active {
  display: block;
}
.edit-sidebar-spacer {
  height: 1em;
}
.edit-sidebar-submit {
  margin-left: 1em;
}
.edit-image-top-menu {
  height: 1em;
  font-family: monospace;
}
.edit-image-top-menu-item {
  display: inline-block;
  background-color: #eee;
  padding: 0 2px;
  min-width: 1em;
  text-align: center;
}
.edit-image-top-button {
  display: inline-block;
  background-color: #eee;
  cursor: pointer;
  padding: 0 2px;
  min-width: 1em;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.edit-image-top-button:hover {
  background-color: #aaa;
}
.edit-image-top-button-enabled {
  background-color: #ccc;
}
.edit-image-top-spacer {
  display: inline-block;
  width: 1em;
}
.edit-image-display {
  display: inline-block;
  vertical-align: top;
}
.edit-main-container {
  white-space: nowrap;
}
.edit-top-menu-block {
  display: inline-block;
  margin: 0 0.5em; 
}*/

.btn {
  color: white !important;
  background-color: rgb(66, 66, 66);
  margin: 2px;
}
</style>