import { Base } from "./base";
import { Request } from "./request";
import { applyMixins } from "./utils";
class NineSdk extends Base { }
interface NineSdk extends Request { }

applyMixins(NineSdk, [Request]);

export default NineSdk;
