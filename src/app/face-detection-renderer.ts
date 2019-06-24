import { FaceDetectResponse } from './azure-face-services/azure-face-detect/model/face-detect-response';
import { emitMetaData } from './azure-face-services/common/emit-meta-data';
import { ImageMapArea } from './image-map-area';

@emitMetaData
export class FaceDetectionRenderer {
    // Default settings
    private _maleColor = '#0000FF';
    private _femaleColor = '#FF0000';

    public setMaleColor(color: string): void {
        this._maleColor = color;
    }

    public setFemaleColor(color: string): void {
        this._femaleColor = color;
    }

    public draw(sourceContext: CanvasRenderingContext2D, faceDetectResponses: FaceDetectResponse[], ratio: number): void {
        sourceContext.lineWidth = 2 / ratio;
        for (const faceDetectResponse of faceDetectResponses) {
            if (faceDetectResponse.faceAttributes.gender === 'male') {
                sourceContext.strokeStyle = this._maleColor;
            } else {
                sourceContext.strokeStyle = this._femaleColor;
            }

            sourceContext.strokeRect(
                faceDetectResponse.faceRectangle.left,
                faceDetectResponse.faceRectangle.top,
                faceDetectResponse.faceRectangle.width,
                faceDetectResponse.faceRectangle.height);
        }
    }

    public createImageMapAreasData(faceDetectResponses: FaceDetectResponse[], ratio: number): ImageMapArea[] {
        const areas: ImageMapArea[] = [];
        for (const faceDetectResponse of faceDetectResponses) {
            areas.push(new ImageMapArea(
                Math.ceil(faceDetectResponse.faceRectangle.top * ratio),
                Math.ceil((faceDetectResponse.faceRectangle.top + faceDetectResponse.faceRectangle.height) * ratio),
                Math.ceil(faceDetectResponse.faceRectangle.left * ratio),
                Math.ceil((faceDetectResponse.faceRectangle.left + faceDetectResponse.faceRectangle.width) * ratio),
                `${faceDetectResponse.faceAttributes.gender} ${faceDetectResponse.faceAttributes.age}`),
            );
        }
        return areas;
    }
}
