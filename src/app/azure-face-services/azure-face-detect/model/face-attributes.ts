import { Accessory } from './accessory';
import { Blur } from './blur';
import { Emotion } from './emotion';
import { Exposure } from './exposure';
import { FacialHair } from './facial-hair';
import { Hair } from './hair';
import { HeadPose } from './head-pose';
import { Makeup } from './makeup';
import { Noise } from './noise';
import { Occlusion } from './occlusion';

export class FaceAttributes {
    public smile: number;
    public headPose: HeadPose;
    public gender: string;
    public age: number;
    public facialHair: FacialHair;
    public glasses: string;
    public emotion: Emotion;
    public blur: Blur;
    public exposure: Exposure;
    public noise: Noise;
    public makeup: Makeup;
    public accessories: Accessory[];
    public occlusion: Occlusion;
    public hair: Hair;
}
