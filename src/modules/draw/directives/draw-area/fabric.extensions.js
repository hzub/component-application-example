import fabricModule from 'fabric';

import faTimesImageUrl from '../../../../assets/images/fa_times.png';
import faRotateImageUrl from '../../../../assets/images/fa_rotate.png';
import faResizeImageUrl from '../../../../assets/images/fa_resize.png';
import faLayersImageUrl from '../../../../assets/images/fa_layers.png';

export default function extendFabric($rootScope, drawService) {
  const topLeftImage = new Image();
  topLeftImage.src = faTimesImageUrl;

  const topRightImage = new Image();
  topRightImage.src = faRotateImageUrl;

  const bottomRightImage = new Image();
  bottomRightImage.src = faResizeImageUrl;

  const bottomLeftImage = new Image();
  bottomLeftImage.src = faLayersImageUrl;

  function isVML() {
    return typeof window.G_vmlCanvasManager !== 'undefined';
  }

  fabricModule.fabric.Object.prototype._drawControl =
    function _drawControl(control, ctx, methodName, left, top) {
      const size = this.cornerSize;

      if (this.isControlVisible(control)) {
        if (!isVML() || !this.transparentCorners) {
          ctx.clearRect(left, top, size, size);
        }

        ctx.strokeStyle = 'rgba(102, 153, 255, 0.5)'; // some color/style
        ctx.lineWidth = 1; // thickness
        if (control === 'tl') {
          ctx.drawImage(topLeftImage, left, top, size, size);
          ctx.strokeRect(left, top, size, size);
        } else if (control === 'tr') {
          ctx.drawImage(topRightImage, left, top, size, size);
          ctx.strokeRect(left, top, size, size);
        } else if (control === 'bl') {
          ctx.drawImage(bottomLeftImage, left, top, size, size);
          ctx.strokeRect(left, top, size, size);
        } else if (control === 'br') {
          ctx.drawImage(bottomRightImage, left, top, size, size);
          ctx.strokeRect(left, top, size, size);
        } else {
          // ctx[methodName](left, top, size, size);
        }
      }
    };

  fabricModule.fabric.Canvas.prototype._getActionFromCorner =
    function _getActionFromCorner(target, corner) {
      let action = 'drag';
      if (corner) {

        action = (corner === 'ml' || corner === 'mr') ? 'scaleX' : (corner === 'mt' || corner === 'mb') ? 'scaleY' : corner === 'tl' ? 'rotate' : 'scale';

        if (corner == 'tr')
          action = 'rotate';

        if (corner == 'tl') {
          action = 'delete';
          deleteObject(target);
        }

        if (corner == 'bl') {
          action = 'layer';
          showLayerChoice(target.top, target.left);

        }

      }

      return action;
    };

  /*fabricModule.fabric.Canvas.prototype._handleCursorAndEvent = function(e, target) {
    this._setCursorFromEvent(e, target);

    // TODO: why are we doing this?
    var _this = this;
    setTimeout(function() {
      _this._setCursorFromEvent(e, target);
    }, 50);

    this.fire('mouse:up', { target: target, e: e });
    target && target.fire('mouseup', { e: e });
  };*/

  fabricModule.fabric.Canvas.prototype._getRotatedCornerCursor = function(corner, target) {
    var cursorOffset = {
      mt: 0, // n
      tr: 1, // ne
      mr: 2, // e
      br: 3, // se
      mb: 4, // s
      bl: 5, // sw
      ml: 6, // w
      tl: 7 // nw
    };

    if (corner == 'tr')
      return 'copy';
    if (corner == 'tl')
      return 'pointer';
    if (corner == 'bl')
      return 'pointer';

    var n = Math.round((target.getAngle() % 360) / 45);

    if (n < 0) {
      n += 8; // full circle ahead
    }
    n += cursorOffset[corner];
    // normalize n to be from 0 to 7
    n %= 8;

    return this.cursorMap[n];
  };


  function showLayerChoice() {
    setTimeout(function() {
      $('#layer-choice').show();
    }, 300);
  }

  function deleteObject(target) {
      target.setVisible(false);
      drawService.deleteSelectedEntity();
      $rootScope.$digest();
  }
}
