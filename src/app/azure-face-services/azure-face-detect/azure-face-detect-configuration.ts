import { environment } from '../../../environments/environment';
import { emitMetaData } from '../common/emit-meta-data';

@emitMetaData
export class AzureFaceDetectConfiguration {
    public url = environment.azureFaceDetectUrl;
    public ocpApimSubscriptionKey = environment.azureOcpApimSubscriptionKey;
}
