import { getSvgPathByName } from '../../../assets/froala-icons/froala-custom.icons';

declare const $: any;

export const froalaEvents = function() {
  return {
    'froalaEditor.click': () => {
      if (!this.quickInsertPopup) {
        const plusButton = $('.fr-floating-btn');
        if (plusButton && plusButton.length) {
          this.quickInsertPopup = true;
          $('.fr-floating-btn svg').remove();
          $(plusButton[0]).append(getSvgPathByName('plus')).show();
        }
      }
    },
    'froalaEditor.keyup': (cmd, data, keydownEvent) => {
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
    'froalaEditor.image.removed': (img) => {
      if ($('.active').length) {
        $('.active').removeClass('active');
      }
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

    /* $.FE.VIDEO_PROVIDERS.push({
         test_regex: /^.+(media.tagesschau.de|tagesschau.de)\/(video)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,
         url_regex: /(?:https?:\/\/)?(?:www\.)?(?:media.tagesschau\.de|tagesschau\.de)\/(?:video)?\/?(.+)/g,
         url_text: 'https://media.tagesschau.de/video/$1',
         html:
             '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
         provider: 'tagesschau'
     });*/

    // $.FroalaEditor.DefineIcon('videoCaption', {NAME: 'commenting'});
    //     // $.FroalaEditor.RegisterCommand('videoCaption', {
    //     //     title: 'Video Caption',
    //     //     focus: false,
    //     //     refreshAfterCallback: false,
    //     //     callback: function (cmd) {
    //     //         const result = this.shared.popup_buttons.filter(
    //     //             item => item.getAttribute('data-cmd') == cmd
    //     //         )[0];
    //     //         const $btn = $(result);
    //     //         const $tb = $(this.shared.popups['video.edit'][0]);
    //     //         $(this.shared.$tb[0])
    //     //             .find('button')
    //     //             .removeClass('fr-disabled');
    //     //         if (!$btn.hasClass('active-caption')) {
    //     //             const videoContentBeforeSelection = this.video.get()[0];
    //     //             const parentElement = $(videoContentBeforeSelection).closest('p');
    //     //             parentElement.find('br:last-child').remove();
    //     //             parentElement.after('<p><br></p>');
    //     //             const span = document.createElement('span');
    //     //             span.contentEditable = 'true';
    //     //             span.classList.add('video_caption');
    //     //             span.classList.add('fr-inner');
    //     //             span.innerHTML = '&#xfeff;Video description';
    //     //             span.addEventListener('click', function (e) {
    //     //                 e.preventDefault();
    //     //                 e.stopPropagation();
    //     //             });
    //     //
    //     //             span.addEventListener('keydown', function (e) {
    //     //                 const selection = window.getSelection();
    //     //                 if (
    //     //                     selection.rangeCount > 0 &&
    //     //                     selection.getRangeAt(0).startOffset == 0 &&
    //     //                     e.keyCode === 8 &&
    //     //                     span.innerText.length > 0 &&
    //     //                     document.getSelection().toString() !== ''
    //     //                 ) {
    //     //                     e.preventDefault();
    //     //                     e.stopPropagation();
    //     //                     if (span.textContent[0] !== '\uFEFF') {
    //     //                         span.innerHTML = '&#xfeff;' + span.textContent;
    //     //                     }
    //     //                     selection.getRangeAt(0).setStart(span, 0);
    //     //                 } else if (
    //     //                     span.innerHTML.replace(/[^\x00-\x7F]/g, '').length == 0 &&
    //     //                     e.keyCode === 8
    //     //                 ) {
    //     //                     span.parentNode.removeChild(span);
    //     //                 }
    //     //             });
    //     //
    //     //             videoContentBeforeSelection.insertAdjacentElement('beforeend', span);
    //     //             $btn.addClass('active-caption');
    //     //             $tb.removeClass('fr-active');
    //     //             span.focus();
    //     //         } else {
    //     //             if (this.video.get()) {
    //     //                 const videoContentBeforeSelection = this.video.get()[0];
    //     //                 const captionSpan = videoContentBeforeSelection.getElementsByClassName(
    //     //                     'video_caption'
    //     //                 );
    //     //                 if (captionSpan != null && captionSpan.length > 0 && captionSpan[0]) {
    //     //                     captionSpan[0].parentNode.removeChild(captionSpan[0]);
    //     //                 }
    //     //                 $btn.removeClass('active-caption');
    //     //             }
    //     //         }
    //     //     },
    //     //     refresh: function ($btn) {
    //     //         if (this.video.get()) {
    //     //             const videoContentBeforeSelection = this.video.get()[0];
    //     //             const captionSpan = videoContentBeforeSelection.getElementsByClassName(
    //     //                 'video_caption'
    //     //             );
    //     //             if (captionSpan != null && captionSpan.length > 0 && captionSpan[0]) {
    //     //                 $btn.addClass('active-caption');
    //     //             } else {
    //     //                 $btn.removeClass('active-caption');
    //     //             }
    //     //         }
    //     //     }
    //     // });
};
