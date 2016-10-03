import fabricModule from 'fabric';
import _ from 'lodash';

const fabric = fabricModule.fabric;

export default class utilConstraints {
  static drawCanvasConstraints(canvas, orientation) {
    canvas.selection = false;

    const width = orientation.width;
    const height = orientation.height;

    const workareaWidth = orientation.workarea_width;
    const workareaHeight = orientation.workarea_height;

    const printableWidth = orientation.printable_width;
    const printableHeight = orientation.printable_height;

    const printableOffsetX = orientation.printable_offset_x;
    const printableOffsetY = orientation.printable_offset_y;

    const left = (workareaWidth / 2) - (width / 2);
    const right = (workareaWidth / 2) + (width / 2);

    const top = (workareaHeight / 2) - (height / 2);
    const bottom = (workareaHeight / 2) + (height / 2);

    const overlayDefinition = {
      fill: 'rgba(0, 0, 0, 0.15)',
      selectable: false,
      hasControls: false,
      hasBorders: false,
      hoverCursor: 'default',
    };

    const topBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: workareaWidth,
      top: 0,
      height: top,
      left: 0,
    }));

    const bottomBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: workareaWidth,
      top: bottom,
      height: workareaHeight - bottom,
      left: 0,
    }));

    const leftBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: left,
      top,
      height: bottom - top,
      left: 0,
    }));

    const rightBox = new fabric.Rect(_.extend(overlayDefinition, {
      width: workareaWidth - right,
      top,
      height: bottom - top,
      left: right,
    }));

    canvas.setBackgroundImage(orientation.background_url, canvas.renderAll.bind(canvas));
    canvas.add(topBox, bottomBox, leftBox, rightBox);

    const workspaceLineDefinition = {
      stroke: 'red',
      strokeDashArray: [5, 7],
      selectable: false,
      hasControls: false,
      hoverCursor: 'default',
    };

    const printableAreaLineDefinition = {
      stroke: 'blue',
      strokeDashArray: [5, 7],
      selectable: false,
      hasControls: false,
      hoverCursor: 'default',
    };

    const leftWorkAreaLine =
      new fabric.Line([left, 0, left, workareaHeight], workspaceLineDefinition);
    const rightWorkAreaLine =
      new fabric.Line([right, 0, right, workareaHeight], workspaceLineDefinition);
    const topWorkAreaLine =
      new fabric.Line([0, top, workareaWidth, top], workspaceLineDefinition);
    const bottomWorkAreaLine =
      new fabric.Line([0, bottom, workareaWidth, bottom], workspaceLineDefinition);

    const leftPrintableAreaLine =
      new fabric.Line(
        [
          left + printableOffsetX,
          0,
          left + printableOffsetX,
          workareaHeight,
        ],
        printableAreaLineDefinition
      );

    const rightPrintableAreaLine =
      new fabric.Line(
        [
          left + printableOffsetX + printableWidth,
          0,
          left + printableOffsetX + printableWidth,
          workareaHeight,
        ],
        printableAreaLineDefinition
      );

    const topPrintableAreaLine =
      new fabric.Line(
        [
          0,
          top + printableOffsetY,
          workareaWidth,
          top + printableOffsetY,
        ],
        printableAreaLineDefinition
      );

    const bottomPrintableAreaLine =
      new fabric.Line(
        [
          0,
          top + printableOffsetY + printableHeight,
          workareaWidth,
          top + printableOffsetY + printableHeight,
        ],
        printableAreaLineDefinition
      );

    canvas.add(
      leftWorkAreaLine,
      rightWorkAreaLine,
      topWorkAreaLine,
      bottomWorkAreaLine
    );

    canvas.add(
      leftPrintableAreaLine,
      rightPrintableAreaLine,
      topPrintableAreaLine,
      bottomPrintableAreaLine
    );
  }
}
