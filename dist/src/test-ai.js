import { generateStartup } from "./app/modules/ai/ai.service.js";
const run = async () => {
    const res = await generateStartup("Say Hello");
    console.log(res);
};
run();
//# sourceMappingURL=test-ai.js.map