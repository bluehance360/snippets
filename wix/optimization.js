import { warmupData, rendering } from '@wix/site-window';

export async function getWarmupData(key, promise) {
    try {
        let value = await warmupData.get(key);

        if (!value) {
            let rendering_env;

            [value, rendering_env] = await Promise.all([
                promise,
                rendering.env()
            ]);

            if (rendering_env == "backend") {
                warmupData.set(key, value);
            }
        }

        return value;
    } catch (error) {
        console.error('error in getWarmupData', error);

        return promise;
    }
}