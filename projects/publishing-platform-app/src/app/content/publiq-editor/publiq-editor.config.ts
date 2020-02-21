
import { UtilService } from '../../core/services/util.service';
import { PubliqEditorComponent } from './publiq-editor.component';

/*
* Publiq editor custom configuration class
* */
export default class PubliqEditorConfig {
  private static _instance: PubliqEditorConfig;
  private _ckEditor: any;

  private constructor() {
  }

  public static get Instance(): PubliqEditorConfig {
    return this._instance || (this._instance = new this());
  }

  public set ckEditor(ckObject) {
    this._ckEditor = ckObject;
  }

  public get ckEditor() {
    return this._ckEditor;
  }

  /*
  * Init CKEditor event listeners
  */
  public initListeners(thisArg: PubliqEditorComponent) {
    this._ckEditor.editing.view.document.on( 'clipboardInput', ( evInfo, data) => {
      if (data.dataTransfer.files.length) {
        evInfo.stop();
        this._ckEditor.execute( 'delete' );
        this._ckEditor.execute('imageUpload', {file: data.dataTransfer.files[0]});
      }
    } );
    this._ckEditor.ui.componentFactory._components.get('gallery').callback()
      .on('change:galleryIsOn', (p1, p2, p3) => {
        thisArg.showGalleryModal = true;
      });
    this._ckEditor.ui.componentFactory._components.get('beforeimginsert').callback()
      .on('change:beforeInsert', (eventInfo, event, options) => {
        thisArg.onImageInsert.emit(options);
      });
    this._ckEditor.ui.componentFactory._components.get('beforeimgdelete').callback()
      .on('change:beforeDelete', (event, evtInfo, imgData) => {
        thisArg.onImageDelete.emit(imgData);
      });
    this._ckEditor.plugins.get( 'Notification' ).on( 'show:caution:size-error', ( evt, evtInfo ) => {
        thisArg.uiNotificationService.error(thisArg.translateService.instant('editor.max_file_size'), '');
      } );
    this._ckEditor.plugins.get( 'Notification' ).on( 'show:caution:upload', ( evt, evtInfo ) => {
        thisArg.uiNotificationService.error(thisArg.translateService.instant('editor.upload_error'), '');
      } );
    this._ckEditor.ui.componentFactory._components.get('imagecrop').callback()
      .on('change:cropIsOn', (p1, p2, p3) => {
        this._ckEditor.plugins.get('WidgetToolbarRepository')._hideToolbar(this._ckEditor.plugins.get('WidgetToolbarRepository')._toolbarDefinitions.get('image'));
        const element = this._ckEditor.model.document.selection.getSelectedElement();
        thisArg.currentReplacementUri = element._attrs.get('data-uri');
        thisArg.CKEditor.utils.fetchLocalImage(element)
          .then((file) => {
            thisArg.croppingImage = file;
            thisArg.showCropModal = true;
            document.querySelector('html').classList.add('overflow-hidden');
            document.querySelector('html').click();
          })
          .catch((err) => console.error(`error in publiq --> description ---> ${err}`));
      });
  }

  /*
  * Replace original image with cropped one
  */
  public addCroppedImage = (thisArg: any) => {
    thisArg.croppingImage = null;
    this._ckEditor.set('simpleUpload', {headers: {replacementUri: thisArg.currentReplacementUri}});
    this._ckEditor.execute('delete');
    this._ckEditor.execute('imageUpload', {file: thisArg.croppedImage.file});
    this._ckEditor.set('simpleUpload', {headers: {replacementUri: ''}});
    thisArg.currentReplacementUri = '';
    document.querySelector('html').classList.remove('overflow-hidden');
    thisArg.showCropModal = false;
  }

  /*
  * Insert image from gallery
  */
  public insertImage(options, thisArg) {
    UtilService.getImageBlob(options.url).then((blob) => {
      thisArg.CKEditor.utils.getImageProperties(options, blob, this._ckEditor).then((params) => {
        const attributes = {
          src: params.default,
          'data-uri': params.uri,
          'data-link': params.link,
          'data-natural-width': params.width,
          'data-natural-height': params.height,
          'imageStyle': params.size,
        };
        this._ckEditor.model.change(writer => {
          thisArg.CKEditor.utils.insertImage(writer, this._ckEditor.model, attributes);
          this.addNewLineAfterImage(writer);
          this._ckEditor.execute('beforeImageInsert', attributes);
          thisArg.onImageInsert.emit(params);
        });
      });
    });
  }

  public addNewLineAfterImage(writer: any) {
    const caretPosition = this._ckEditor.model.document.selection.getLastPosition();
    if (!caretPosition.nodeAfter || caretPosition.nodeAfter.name !== 'paragraph') {
      const pElement = writer.createElement('paragraph');
      writer.insert(pElement, this._ckEditor.model.document.selection.getLastPosition());
    }
  }

  /*
  * Extending image element allowed attributes in CKEditor Schema
  * */
  public extendImageAttrs = () => {
    // data-uri
    this._ckEditor.conversion.for('upcast').attributeToAttribute({
      view: 'data-uri',
      model: 'data-uri'
    });
    this._ckEditor.conversion.for('downcast').add(dispatcher => {
      dispatcher.on('attribute:data-uri:image', (evt, data, conversionApi) => {
        if (!conversionApi.consumable.consume(data.item, evt.name)) {
          return;
        }

        const viewWriter = conversionApi.writer;
        const figure = conversionApi.mapper.toViewElement(data.item);
        const img = figure.getChild(0);

        if (data.attributeNewValue !== null) {
          viewWriter.setAttribute('data-uri', data.attributeNewValue, img);
        } else {
          viewWriter.removeAttribute('data-uri', img);
        }
      });
    });
    // data-link
    this._ckEditor.conversion.for('upcast').attributeToAttribute({
      view: 'data-link',
      model: 'data-link'
    });
    this._ckEditor.conversion.for('downcast').add(dispatcher => {
      dispatcher.on('attribute:data-link:image', (evt, data, conversionApi) => {
        if (!conversionApi.consumable.consume(data.item, evt.name)) {
          return;
        }

        const viewWriter = conversionApi.writer;
        const figure = conversionApi.mapper.toViewElement(data.item);
        const img = figure.getChild(0);

        if (data.attributeNewValue !== null) {
          viewWriter.setAttribute('data-link', data.attributeNewValue, img);
        } else {
          viewWriter.removeAttribute('data-link', img);
        }
      });
    });
    // natural-width
    this._ckEditor.conversion.for('upcast').attributeToAttribute({
      view: 'data-natural-width',
      model: 'data-natural-width'
    });
    this._ckEditor.conversion.for('downcast').add(dispatcher => {
      dispatcher.on('attribute:data-natural-width:image', (evt, data, conversionApi) => {
        if (!conversionApi.consumable.consume(data.item, evt.name)) {
          return;
        }

        const viewWriter = conversionApi.writer;
        const figure = conversionApi.mapper.toViewElement(data.item);
        const img = figure.getChild(0);

        if (data.attributeNewValue !== null) {
          viewWriter.setAttribute('data-natural-width', data.attributeNewValue, img);
        } else {
          viewWriter.removeAttribute('data-natural-width', img);
        }
      });
    });
    // natural-height
    this._ckEditor.conversion.for('upcast').attributeToAttribute({
      view: 'data-natural-height',
      model: 'data-natural-height'
    });
    this._ckEditor.conversion.for('downcast').add(dispatcher => {
      dispatcher.on('attribute:data-natural-height:image', (evt, data, conversionApi) => {
        if (!conversionApi.consumable.consume(data.item, evt.name)) {
          return;
        }

        const viewWriter = conversionApi.writer;
        const figure = conversionApi.mapper.toViewElement(data.item);
        const img = figure.getChild(0);

        if (data.attributeNewValue !== null) {
          viewWriter.setAttribute('data-natural-height', data.attributeNewValue, img);
        } else {
          viewWriter.removeAttribute('data-natural-height', img);
        }
      });
    });
    this._ckEditor.model.schema.extend('image', {
      allowAttributes: ['data-uri', 'data-link', 'data-natural-height', 'data-natural-width']
    });
  }
}
