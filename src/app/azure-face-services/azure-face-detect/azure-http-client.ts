import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { emitMetaData } from '../common/emit-meta-data';
import { FaceDetectResponse } from './model/face-detect-response';

@emitMetaData
export class AzureHttpClient {
    private _headers: HttpHeaders;
    private _params: HttpParams;
    private _url: string;
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    public setUrl(url: string): AzureHttpClient {
        this._url = url;
        return this;
    }

    public addHeaders(subscriptionKey: string): AzureHttpClient {
        this._headers = new HttpHeaders();
        this._headers = this._headers.set('Content-Type', 'application/octet-stream');
        this._headers = this._headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);
        return this;
    }

    public addParams(): AzureHttpClient {
        this._params = new HttpParams()
            .set('returnFaceId', 'true')
            .set('returnFaceLandmarks', 'false')
            .set('returnFaceAttributes',
                'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
            );
        return this;
    }

    public post(image: Blob): Observable<FaceDetectResponse[]> {
        return this._httpClient.post<FaceDetectResponse[]>(
            this._url,
            image,
            {
                headers: this._headers,
                params: this._params,
            },
        );
    }
}
