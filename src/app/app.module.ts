import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AzureFaceDetectConfiguration } from './azure-face-services/azure-face-detect/azure-face-detect-configuration';
import { AzureFaceRecognitionService } from './azure-face-services/azure-face-detect/azure-face-detect.service';
import { AzureHttpClient } from './azure-face-services/azure-face-detect/azure-http-client';
import { ImageSerializer } from './azure-face-services/azure-face-detect/image-serializer';
import { FaceDetectionRenderer } from './face-detection-renderer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    AzureFaceDetectConfiguration,
    AzureFaceRecognitionService,
    AzureHttpClient,
    ImageSerializer,
    FaceDetectionRenderer,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
