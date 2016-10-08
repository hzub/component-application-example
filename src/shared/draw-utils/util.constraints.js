import fabricModule from 'fabric';

const fabric = fabricModule.fabric;

export default class utilConstraints {
  static drawCanvasConstraints(canvas, orientation) {
    canvas.selection = false;

    const printableWidth = orientation.printable_width;
    const printableHeight = orientation.printable_height;

    const printableOffsetX = orientation.printable_offset_x;
    const printableOffsetY = orientation.printable_offset_y;

    canvas.setBackgroundColor({ source: orientation.background_url, repeat: 'repeat' }, () => {
      canvas.renderAll();
    });

    const printableAreaLineDefinition = {
      stroke: 'blue',
      strokeDashArray: [5, 7],
      selectable: false,
      hasControls: false,
      hoverCursor: 'default',
      opacity: 0,
    };

    printableAreaLineDefinition.toObject = baseToObject => function toObject() {
      const object = baseToObject.call(this);
      object.$removeFromSave = true;
      return object;
    };

    const leftPrintableAreaLine =
      new fabric.Line(
        [
          printableOffsetX,
          printableOffsetY,
          printableOffsetX,
          printableOffsetY + printableHeight,
        ],
        printableAreaLineDefinition
      );

    const rightPrintableAreaLine =
      new fabric.Line(
        [
          printableOffsetX + printableWidth,
          printableOffsetY,
          printableOffsetX + printableWidth,
          printableOffsetY + printableHeight,
        ],
        printableAreaLineDefinition
      );

    const topPrintableAreaLine =
      new fabric.Line(
        [
          printableOffsetX,
          printableOffsetY,
          printableOffsetX + printableWidth,
          printableOffsetY,
        ],
        printableAreaLineDefinition
      );

    const bottomPrintableAreaLine =
      new fabric.Line(
        [
          printableOffsetX,
          printableOffsetY + printableHeight,
          printableOffsetX + printableWidth,
          printableOffsetY + printableHeight,
        ],
        printableAreaLineDefinition
      );

    const areaLines = [
      leftPrintableAreaLine,
      rightPrintableAreaLine,
      topPrintableAreaLine,
      bottomPrintableAreaLine,
    ];

    canvas.add.call(canvas, ...areaLines);

    return areaLines;
  }
}
