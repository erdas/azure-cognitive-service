import { Observable } from 'rxjs';
import { emitMetaData } from '../common/emit-meta-data';
import { AzureFaceDetectConfiguration } from './azure-face-detect-configuration';
import { AzureHttpClient } from './azure-http-client';
import { ImageSerializer } from './image-serializer';
import { FaceDetectResponse } from './model/face-detect-response';

@emitMetaData
export class AzureFaceRecognitionService {
    private _azureHttpClient: AzureHttpClient;
    private _azureFaceRecognitionConfiguration: AzureFaceDetectConfiguration;
    private _imageSerializer: ImageSerializer;

    constructor(
        imageSerializer: ImageSerializer,
        azureHttpClient: AzureHttpClient,
        azureFaceRecognitionConfiguration: AzureFaceDetectConfiguration) {
        this._azureHttpClient = azureHttpClient;
        this._azureFaceRecognitionConfiguration = azureFaceRecognitionConfiguration;
        this._imageSerializer = imageSerializer;
    }

    public recognize(dataUri: string): Observable<FaceDetectResponse[]> {
        const blob = this._imageSerializer.dataURItoBlob(dataUri);
        return this._azureHttpClient
            .setUrl(this._azureFaceRecognitionConfiguration.url)
            .addHeaders(this._azureFaceRecognitionConfiguration.ocpApimSubscriptionKey)
            .addParams()
            .post(blob);
    }
}
