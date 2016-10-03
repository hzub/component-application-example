export default class utilZoom {
  static relativePan(canvas, canvasZoom, x, y) {
    const constraintW = canvas.width;
    const constraintH = canvas.height;

    const zoom = Math.pow(1.1, canvasZoom - 1);

    const vpt = canvas.viewportTransform.slice(0);

    vpt[4] = x + canvas.viewportTransform[4];
    if (vpt[4] > 0) {
      vpt[4] = 0;
    }

    if (vpt[4] < constraintW - (constraintW * zoom)) {
      vpt[4] = constraintW - (constraintW * zoom);
    }

    vpt[5] = y + canvas.viewportTransform[5];
    if (vpt[5] > 0) {
      vpt[5] = 0;
    }

    if (vpt[5] < constraintH - (constraintH * zoom)) {
      vpt[5] = constraintH - (constraintH * zoom);
    }

    return canvas.setViewportTransform(vpt);
  }

  static redrawZoom(canvas, canvasZoom) {
    const zoom = Math.pow(1.1, canvasZoom - 1);
    canvas.setZoom(zoom);

    const constraintW = canvas.width;
    const constraintH = canvas.height;

    const viewportTransform = canvas.viewportTransform.slice(0);

    if (viewportTransform[4] > 0) {
      viewportTransform[4] = 0;
    }

    if (viewportTransform[4] < constraintW - (constraintW * zoom)) {
      viewportTransform[4] = constraintW - (constraintW * zoom);
    }

    if (viewportTransform[5] > 0) {
      viewportTransform[5] = 0;
    }

    if (viewportTransform[5] < constraintH - (constraintH * zoom)) {
      viewportTransform[5] = constraintH - (constraintH * zoom);
    }

    canvas.setViewportTransform(viewportTransform);

  }
}