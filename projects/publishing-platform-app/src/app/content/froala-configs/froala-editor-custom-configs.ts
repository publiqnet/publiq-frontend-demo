import { getSvgPathByName } from '../../../assets/froala-icons/froala-custom.icons';
import { Observable } from 'rxjs';

declare const $: any;

export const froalaEvents = function () {
  return {
    'froalaEditor.click': (event, editor, keydownEvent) => {
      if (!this.quickInsertPopup) {
        const placeholderButton = $('span.fr-placeholder');
        if (placeholderButton && placeholderButton.length) {
          placeholderButton.remove();
        }
        const plusButton = $('.fr-floating-btn');
        if (plusButton && plusButton.length) {
          this.quickInsertPopup = true;
          $('.fr-floating-btn svg').remove();
          $(plusButton[0]).append(getSvgPathByName('plus')).show();
        }
      }
    },
    'froalaEditor.keyup': (event, editor, keydownEvent) => {
      if (keydownEvent.keyCode === 13) {
        if (!this.quickInsertPopup) {
          const plusButton = $('.fr-floating-btn');
          if (plusButton && plusButton.length) {
            this.quickInsertPopup = true;
            $('.fr-floating-btn svg').remove();
            $(plusButton[0]).append(getSvgPathByName('plus')).show();
          }
        }
      }
    },
    'froalaEditor.keydown': (event, editor, keydownEvent) => {
      if ((keydownEvent.keyCode === 8 || keydownEvent.keyCode === 46) && editor.charCounter.count() === 0) {
        if (!$(keydownEvent.target).parent().children('div').children('p').length) {
          $(keydownEvent.target).parent().children('div').append('<p><br></p>');
          editor.selection.setAtEnd($(keydownEvent.target).parent().children('div').children('p').get(0));
          editor.selection.restore();
        }
      }
    },
    'froalaEditor.image.loaded': (e, editor, img) => {
      // editor.popups.hide('image.edit');
      // this.utilService.getImageBlob(img[0].src).then((blob) => {
      //   if (blob.type === 'image/gif') {
      //     $('.fr-btn[data-cmd="imageCrop"]').addClass('fr-disabled size-disabled');
      //   }
      //   editor.popups.show('image.edit');
      // });
    },
    'froalaEditor.image.inserted': (e, editor, img, response) => {
      if (response) {
        const responseData = JSON.parse(response);
        this.contentUris[responseData.uri] = responseData.link.replace(/&amp;/g, '&');
        img.attr('data-uri', responseData.uri);
        this.selectedCoverImageUri = responseData.uri;
        if (!$(img).closest('p').length) { img.wrap('<p></p>'); }
        $(img).closest('p').find('br:first').remove();
        $(img).closest('p').after('<p data-empty="true"><br></p>');
        const parent = $(img).closest('p');

        setTimeout(() => {
          $(img).attr('width', Math.floor($(img).width()));
          $(img).attr('height', Math.floor($(img).height()));
        }, 500);

        contentUrisChange.call(this);
        getImageSize($(img).attr('src')).subscribe((dimensions: ({ width: number, height: number })) => {
          $(img).attr('data-natural-width', dimensions.width);
          $(img).attr('data-natural-height', dimensions.height);
          setImageSize(img);
        });

        $(editor.popups.get('image.edit')).addClass('image-edit-popup');
        $('.active').removeClass('active');

        if (parent.hasClass('containersize-image')) {
          $('.fr-btn[data-cmd="containersize"] > svg > g').addClass('active');
        } else if (parent.hasClass('fullsize-image')) {
          $('.fr-btn[data-cmd="fullsize"] > svg > g').addClass('active');
        } else if (parent.hasClass('gridsize-image')) {
          $('.fr-btn[data-cmd="gridsize"] > svg > g').addClass('active');
        }
      }
    },
    'froalaEditor.image.removed': () => {
      // $('.fr-btn[data-cmd="imageCrop"]').removeClass('fr-disabled size-disabled');
      if ($('.active').length) {
        $('.active').removeClass('active');
      }
    },
    'froalaEditor.image.uploaded': () => {
      this.editorContentObject.opts.imageUploadParams = {};
    },
    'froalaEditor.popups.show.table.edit': () => {
      if (!this.tableEditPopup) {
        this.tableEditPopup = true;
        $(`.fa-align-justify`).remove();
        $(`.fa-align-left`).remove();
        $(`.fa-align-right`).remove();
        $(`.fa-align-center`).remove();
        $(`a[data-cmd="tableCellHorizontalAlign"][data-param1="left"]`).append(getSvgPathByName('justifyLeft')).show();
        $(`a[data-cmd="tableCellHorizontalAlign"][data-param1="right"]`).append(getSvgPathByName('justifyRight')).show();
        $(`a[data-cmd="tableCellHorizontalAlign"][data-param1="center"]`).append(getSvgPathByName('justifyCenter')).show();
        $(`a[data-cmd="tableCellHorizontalAlign"][data-param1="justify"]`).append(getSvgPathByName('justify')).show();
      }
    },
    'froalaEditor.commands.after': (e, editor, cmd, action) => {
      if (cmd === 'tableCellHorizontalAlign' && $('[data-cmd=tableCellHorizontalAlign]').length) {
        const horizontalAlignmentButton = $('button[data-cmd=tableCellHorizontalAlign]');
        if (horizontalAlignmentButton.children('svg').length) {
          horizontalAlignmentButton.children('svg').remove();
        }
        switch (action) {
          case 'left' :
            horizontalAlignmentButton.append(getSvgPathByName('justifyLeft'));
            break;
          case 'right' :
            horizontalAlignmentButton.append(getSvgPathByName('justifyRight'));
            break;
          case 'center' :
            horizontalAlignmentButton.append(getSvgPathByName('justifyCenter'));
            break;
          case 'justify' :
            horizontalAlignmentButton.append(getSvgPathByName('justify'));
            break;
        }
      }

      if (cmd === 'imageUpload' || cmd === 'imageByURL' || cmd === 'videoByURL') {
        editor.popups.get(cmd === 'videoByURL' ? 'video.insert' : 'image.insert').css('top', '-=10px');
      }
    },
  };
};

export const FroalaEditorCustomConfigs = function () {
  $.FroalaEditor.DefineIconTemplate('svg', '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>');
  $.FroalaEditor.DefineIcon('bold', {PATH: getSvgPathByName('bold'), template: 'svg'});
  $.FroalaEditor.DefineIcon('italic', {PATH: getSvgPathByName('italic'), template: 'svg'});
  $.FroalaEditor.DefineIcon('insertLink', {PATH: getSvgPathByName('link'), template: 'svg'});
  $.FroalaEditor.DefineIcon('formatOL', {PATH: getSvgPathByName('numberedList'), template: 'svg'});
  $.FroalaEditor.DefineIcon('formatUL', {PATH: getSvgPathByName('bulletList'), template: 'svg'});
  $.FroalaEditor.DefineIcon('paragraphFormat', {PATH: getSvgPathByName('paragraph'), template: 'svg'});
  $.FroalaEditor.DefineIcon('quote', {PATH: getSvgPathByName('quote'), template: 'svg'});
  $.FroalaEditor.DefineIcon('plusCustom', {PATH: getSvgPathByName('plus'), template: 'svg'});
  $.FroalaEditor.DefineIcon('imageRemove', {PATH: getSvgPathByName('delete'), template: 'svg'});
  $.FroalaEditor.DefineIcon('imageCaption', {PATH: getSvgPathByName('caption'), template: 'svg'});
  $.FroalaEditor.DefineIcon('linkOpen', {PATH: getSvgPathByName('openLink'), template: 'svg'});
  $.FroalaEditor.DefineIcon('linkRemove', {PATH: getSvgPathByName('unLink'), template: 'svg'});
  $.FroalaEditor.DefineIcon('linkStyle', {PATH: getSvgPathByName('effect'), template: 'svg'});
  $.FroalaEditor.DefineIcon('linkEdit', {PATH: getSvgPathByName('editLink'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableHeader', {PATH: getSvgPathByName('tableHeader'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableStyle', {PATH: getSvgPathByName('tableStyle'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableCells', {PATH: getSvgPathByName('cell'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableColumns', {PATH: getSvgPathByName('column'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableRows', {PATH: getSvgPathByName('row'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableCellBackground', {PATH: getSvgPathByName('color'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableCellVerticalAlign', {PATH: getSvgPathByName('verticalAlign'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableRemove', {PATH: getSvgPathByName('delete'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableCellStyle', {PATH: getSvgPathByName('effect'), template: 'svg'});
  $.FroalaEditor.DefineIcon('tableCellHorizontalAlign', {PATH: getSvgPathByName('justifyRight'), template: 'svg'});
  $.FroalaEditor.DefineIcon('quickVideo', {PATH: getSvgPathByName('video'), template: 'svg'});
  $.FroalaEditor.RegisterQuickInsertButton('quickVideo', {
    title: $.FroalaEditor.QUICK_INSERT_BUTTONS.video.title,
    icon: 'quickVideo',
    focus: $.FroalaEditor.COMMANDS.insertVideo.focus,
    refreshAfterCallback: $.FroalaEditor.COMMANDS.insertVideo.refreshAfterCallback,
    popup: $.FroalaEditor.COMMANDS.insertVideo.popup,
    undo: $.FroalaEditor.COMMANDS.insertVideo.undo,
    callback: $.FroalaEditor.COMMANDS.insertVideo.callback,
    requiredPlugin: 'video'
  });
  $.FroalaEditor.DefineIcon('quickImage', {PATH: getSvgPathByName('image'), template: 'svg'});
  $.FroalaEditor.RegisterQuickInsertButton('quickImage', {
    title: $.FroalaEditor.QUICK_INSERT_BUTTONS.image.title,
    icon: 'quickImage',
    focus: $.FroalaEditor.COMMANDS.insertImage.focus,
    refreshAfterCallback: $.FroalaEditor.COMMANDS.insertImage.refreshAfterCallback,
    popup: $.FroalaEditor.COMMANDS.insertImage.popup,
    undo: $.FroalaEditor.COMMANDS.insertImage.undo,
    callback: $.FroalaEditor.COMMANDS.insertImage.callback,
    requiredPlugin: 'image'
  });
  $.FroalaEditor.DefineIcon('containersize', {PATH: getSvgPathByName('grid3'), template: 'svg'});
  $.FroalaEditor.RegisterCommand('containersize', {
    title: 'Large',
    focus: false,
    icon: 'containersize',
    undo: false,
    refreshAfterCallback: false,
    callback: () => {
      if ($('.active').length) {
        $('.active').removeClass('active');
      }
      $('#icon-grid-3').addClass('active');
      const $img = this.editorContentObject.image.get();
      if ($img.closest('p')) {
        toggleImageSize(
          $img
            .attr('data-size', 'containersize')
            .closest('p'),
          'containersize-image'
        );

        $img.attr('width', $img.width());
        $img.attr('height', $img.height());
        this.saveDraft(this.draftId);
      }
    }
  });
  $.FroalaEditor.DefineIcon('fullsize', {PATH: getSvgPathByName('grid2'), template: 'svg'});
  $.FroalaEditor.RegisterCommand('fullsize', {
    title: 'Fullsize',
    focus: false,
    icon: 'fullsize',
    undo: false,
    refreshAfterCallback: false,
    callback: () => {
      if ($('.active').length) {
        $('.active').removeClass('active');
      }
      $('#icon-grid-2').addClass('active');
      const $img = this.editorContentObject.image.get();
      if ($img.closest('p')) {
        toggleImageSize(
          $img
            .attr('data-size', 'fullsize')
            .closest('p'),
          'fullsize-image'
        );

        $img.attr('width', Math.floor($img.width()));
        $img.attr('height', Math.floor($img.height()));
        this.saveDraft(this.draftId);
      }
    }
  });
  $.FroalaEditor.DefineIcon('imageCrop', {PATH: getSvgPathByName('crop'), template: 'svg'});
  $.FroalaEditor.RegisterCommand('imageCrop', {
    title: 'Crop Image',
    focus: false,
    icon: 'imageCrop',
    undo: false,
    refreshAfterCallback: false,
    callback: () => {
      const $img = this.editorContentObject.image.get();
      this.showCropModal = true;
      if (this.showCropModal) {
        document.querySelector('html').classList.add('overflow-hidden');
      } else {
        document.querySelector('html').classList.remove('overflow-hidden');
      }
      this.croppedOriginalImg = $img;
      this.cursorHostElement = $img.closest('p');
      this.utilService.getImageBlob($img[0].src).then((blob) => {
        this.croppingImage = blob;
      },
        (err) => {});
    }
  });
  $.FroalaEditor.DefineIcon('gridsize', {PATH: getSvgPathByName('grid1'), template: 'svg'});
  $.FroalaEditor.RegisterCommand('gridsize', {
    title: 'Grid size',
    focus: false,
    icon: 'gridsize',
    undo: false,
    refreshAfterCallback: false,
    callback: () => {
      if ($('.active').length) {
        $('.active').removeClass('active');
      }
      $('#icon-grid-1').addClass('active');
      const $img = this.editorContentObject.image.get();
      if ($img.closest('p')) {
        toggleImageSize(
          $img
            .attr('data-size', 'gridsize')
            .closest('p'),
          'gridsize-image'
        );

        $img.attr('width', $img.width());
        $img.attr('height', $img.height());
        this.saveDraft(this.draftId);
      }
    }
  });

  $.FroalaEditor.DefineIcon('search', {PATH: getSvgPathByName('search'), template: 'svg'});
  $.FroalaEditor.RegisterQuickInsertButton('search', {
    title: 'Search image',
    icon: 'search',
    undo: false,
    focus: false,
    callback: () => {
      this.ngZone.run(() => {
        this.cursorHostElement = this.editorContentObject.selection.element().closest('p');
        this.showGallery = true;
      });
    }
  });
  $.FroalaEditor.DefineIcon('searchInner', {PATH: getSvgPathByName('search'), template: 'svg'});
  $.FroalaEditor.RegisterCommand('searchInner', {
    title: 'Search image',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: () => {
      this.ngZone.run(() => {
        this.showGallery = true;
      });
    }
  });
};

export function toggleImageSizeModifiers($width) {
  $width = parseInt($width, 10);

  if ($width >= 1440) {
    $('[data-cmd="gridsize"], .fr-btn[data-cmd="containersize"], .fr-btn[data-cmd="fullsize"]').removeClass('fr-disabled size-disabled');
  } else if ($width >= 1310) {
    $('.fr-btn[data-cmd="fullsize"]').addClass('fr-disabled size-disabled');
    $('[data-cmd="gridsize"], .fr-btn[data-cmd="containersize"]').removeClass('fr-disabled size-disabled');
  } else if ($width >= 870) {
    $('.fr-btn[data-cmd="containersize"], .fr-btn[data-cmd="fullsize"]').addClass('fr-disabled size-disabled');
    $('[data-cmd="gridsize"]').removeClass('fr-disabled size-disabled');
  } else {
    $('[data-cmd="gridsize"], .fr-btn[data-cmd="containersize"], .fr-btn[data-cmd="fullsize"]').addClass('fr-disabled size-disabled');
  }
}

export function setImageSize(img) {
  const $img = $(img),
    $parent = $img.closest('p'),
    $width = parseInt($(img).data('natural-width'), 10);

  $('[data-cmd="gridsize"], .fr-btn[data-cmd="containersize"], .fr-btn[data-cmd="fullsize"]')
    .find('> svg > g')
    .removeClass('active');

  if ($width >= 1440) {
    $img.attr('data-size', 'fullsize');
    toggleImageSize($parent, 'fullsize-image');

    $('.fr-btn[data-cmd="fullsize"] > svg > g').addClass('active');
  } else if ($width >= 1310) {
    $img.attr('data-size', 'containersize');
    toggleImageSize($parent, 'containersize-image');

    $('.fr-btn[data-cmd="containersize"] > svg > g').addClass('active');
  } else if ($width >= 870) {
    $img.attr('data-size', 'gridsize');
    toggleImageSize($parent, 'gridsize-image');

    $('.fr-btn[data-cmd="gridsize"] > svg > g').addClass('active');
  } else {
    $img.attr('data-size', 'default');
    toggleImageSize($parent, 'defaultsize-image');
  }

  toggleImageSizeModifiers($width);
}

export function getImageSize(url) {
  return new Observable($obs => {
    const img = new Image();

    img.onload = function () {
      $obs.next({width: (this as any).width, height: (this as any).height});
    };
    img.src = url;
  });
}

export function contentUrisChange() {
  if (this.additionalCoverImage['uri'] && this.contentUris[this.additionalCoverImage['uri']] && (this.selectedCoverImageUri != this.additionalCoverImage['uri'] || this.hideCover)) {
    delete this.contentUris[this.additionalCoverImage['uri']];
  } else if (!this.contentUris[this.selectedCoverImageUri]) {
    this.contentUris[this.selectedCoverImageUri] = this.coverImagesList[this.selectedCoverImageUri];
  }
}

export function toggleImageSize(el, size) {
  const sizes = ['defaultsize-image', 'gridsize-image', 'containersize-image', 'fullsize-image'].splice(size);

  el.removeClass(sizes.join(' ')).addClass(size);
}

export function addCroppedImage() {
  this.croppingImage = null;
  this.editorContentObject.selection.get().setPosition($(this.croppedOriginalImg).closest('p')[0]);
  this.editorContentObject.selection.restore();
  this.editorContentObject.image.remove(this.croppedOriginalImg);
  let uri;
  if (this.croppedOriginalImg[0].dataset && this.croppedOriginalImg[0].dataset.uri) {
    uri = this.croppedOriginalImg[0].dataset.uri;
  } else if (this.croppedOriginalImg[0].path && this.croppedOriginalImg[0].path[0]) {
    uri = this.croppedOriginalImg[0].path[0]['dataset']['uri'];
  }
  this.editorContentObject.opts.imageUploadParams = {
    'replacementUri': uri
  };
  this.editorContentObject.image.upload([this.utilService.blobToFile(this.croppedImage.file, `Publiq__${new Date().toString()}`)]);
  // $(this.cursorHostElement).find('img').last().remove();
  this.cursorHostElement = null;
  this.showCropModal = false;
  document.querySelector('html').classList.remove('overflow-hidden');
}

