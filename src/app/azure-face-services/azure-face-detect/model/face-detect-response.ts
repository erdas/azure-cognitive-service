import { FaceAttributes } from './face-attributes';
import { FaceRectangle } from './race-rectangle';

export class FaceDetectResponse {
    public faceId: string;
    public faceRectangle: FaceRectangle;
    public faceAttributes: FaceAttributes;
}
