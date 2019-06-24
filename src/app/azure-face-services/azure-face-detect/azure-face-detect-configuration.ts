import { azureConfiguration } from '../../../environments/azure-configuration';
import { emitMetaData } from '../common/emit-meta-data';

@emitMetaData
export class AzureFaceDetectConfiguration {
    public url = azureConfiguration.faceDetectUrl;
    public ocpApimSubscriptionKey = azureConfiguration.ocpApimSubscriptionKey;
}
