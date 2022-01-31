import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';

export interface Foto {
  webviewPath: string;
}
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
public photos: Foto[] = [];

  constructor() { }

  public async capturarFoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      correctOrientation: true,
      allowEditing: false,
      quality: 60
    });

    return capturedPhoto;

    // const base64Data = await this.readAsBase64(capturedPhoto);
    // const imagen = window.Ionic.WebView.convertFileSrc(capturedPhoto);
    // const imagen = this.readAsBase64(capturedPhoto);

    // this.photos.unshift({
    //   webviewPath: capturedPhoto.webPath
    // });
    // return imagen;
  }

  private async readAsBase64(cameraPhoto: Photo) {

    // Fetch the photo, read as a blob, then convert to base64 format
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const response = await fetch(cameraPhoto.webPath!);
    // const blob = await response.blob();
    const file = await Filesystem.readFile({
      path: cameraPhoto.path
    });

    return file.data;
    // return await this.convertBlobToBase64(blob) as string;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  // convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.onerror = reject;
  //   reader.onload = () => {
  //       resolve(reader.result);
  //   };
  //   reader.readAsDataURL(blob);
  // });


}
