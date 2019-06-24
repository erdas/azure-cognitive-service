import { Component, ElementRef, ViewChild } from '@angular/core';
import { AzureFaceRecognitionService } from './azure-face-services/azure-face-detect/azure-face-detect.service';
import { FaceDetectResponse } from './azure-face-services/azure-face-detect/model/face-detect-response';
import { FaceDetectionRenderer } from './face-detection-renderer';
import { ImageMapArea } from './image-map-area';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    @ViewChild('webcam') public webcam: ElementRef;
    @ViewChild('canvas') public canvas: ElementRef;

    public captureDataUri: string;
    public webcamActive: boolean;
    public imageWidth = 800;
    public faceRecognitionResponse: FaceDetectResponse[];

    public stream: MediaStream;
    public areas: ImageMapArea[] = [];

    public constructor(
        private _azureFaceRecognitionService: AzureFaceRecognitionService,
        private _faceDetectionRenderer: FaceDetectionRenderer) {
    }

    public startCamera(): void {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.webcamActive = true;
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    this.stream = stream;
                    this.webcam.nativeElement.srcObject = stream;
                    this.webcam.nativeElement.play();
                });
        }
    }

    public faceRecognition(): void {
        const webcamElement = this.webcam.nativeElement as HTMLElement;
        this.captureDataUri = this.createDataUri(this.webcam.nativeElement, webcamElement.clientWidth, webcamElement.clientHeight);

        this._azureFaceRecognitionService.recognize(this.captureDataUri).subscribe((x) => {
            this.faceRecognitionResponse = x;
            const canvas = this.canvas.nativeElement;
            const ratio = this.imageWidth / canvas.width;
            this._faceDetectionRenderer.draw(canvas.getContext('2d'), x, ratio);
            this.areas = this._faceDetectionRenderer.createImageMapAreasData(x, ratio);
            this.captureDataUri = canvas.toDataURL();
        });;
        this.stopCamera();
    }

    public onFileChanged(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    this.captureDataUri = this.createDataUri(img, img.width, img.height);
                    this._azureFaceRecognitionService.recognize(reader.result as string).subscribe((x) => {
                        this.faceRecognitionResponse = x;
                        const canvas = this.canvas.nativeElement;
                        const ratio = this.imageWidth / canvas.width;
                        this._faceDetectionRenderer.draw(canvas.getContext('2d'), x, ratio);
                        this.areas = this._faceDetectionRenderer.createImageMapAreasData(x, ratio);
                        this.captureDataUri = canvas.toDataURL();
                    });
                };

                img.src = reader.result as string;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    private createDataUri(img: any, width: number, height: number): string {
        this.canvas.nativeElement.width = width;
        this.canvas.nativeElement.height = height;
        this.canvas
            .nativeElement.getContext('2d')
            .drawImage(img, 0, 0, width, height);

        return this.canvas.nativeElement.toDataURL();
    }

    private stopCamera(): void {
        if (this.stream != undefined) {
            this.stream.getTracks()
                .forEach((track) => track.stop());
            this.webcamActive = false;
        }
    }
}
