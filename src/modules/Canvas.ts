import { JSXElement } from "solid-js";
import { Colour } from "../types";

type CanvasElement = HTMLCanvasElement | JSXElement

export class Canvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(canvas?: HTMLCanvasElement) {
        if (canvas) {
            this.canvas = canvas
        } else {
            this.canvas = document.createElement('canvas')
        }
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true})
    }

    /**
     * Draw an image on canvas.
     *
     * @param image The image to be overlayed, can be a promise.
    */
    async drawImage(image: HTMLImageElement) {
        await image.decode()
        this.ctx.drawImage(image, 0, 0)
    }

    /**
     * Overlay another canvas on top of me 
     *
     * @param canvasLayer The image to be overlayed, may be a promise.
    */
    async layer(canvasLayer: Canvas) {
        const c1ImgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const c2ImgData = canvasLayer.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        const c1Data = c1ImgData.data
        const c2Data = c2ImgData.data
        for (var i = 0; i < c2Data.length; i += 4) {
            if (c2Data[i + 3] != 0) {
                c1Data[i] = c2Data[i]
                c1Data[i + 1] = c2Data[i + 1]
                c1Data[i + 2] = c2Data[i + 2]
            }
        }
        await this.ctx.putImageData(c1ImgData, 0, 0)
        return
    }

    /**
     * Colourfies this layer
     *
     * @param colour The image to be overlayed, may be a promise.
    */
    async colourfy(colour: Colour) {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data
        for (var i = 0; i < data.length; i += 4) {
            if (data[i + 3] !== 0) {
                data[i] = data[i] - (255 - colour[0])
                data[i + 1] = data[i + 1] - (255 - colour[1])
                data[i + 2] = data[i + 2] - (255 - colour[2])
            }
        }
        this.ctx.putImageData(imageData, 0, 0)
        return
    }

    /**
     * Clears this canvas, leaving a solid colour
    */
    async clear() {
        this.ctx.fillStyle = "#c0cbdc"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        return
    }

    /**
     * Gets the width property of this canvas.
     * @returns width
    */
    get width(): number {
        return this.canvas.width
    }

    /**
     * Gets the height property of this canvas.
     * @returns height
    */
    get height(): number {
        return this.canvas.height
    }
}