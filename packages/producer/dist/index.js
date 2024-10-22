"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../../node_modules/@prisma/client");
const client = new client_1.PrismaClient();
// const kafka = new Kafka({
//     clientId: 'my-app',
//     brokers: ['kafka1:9092', 'kafka2:9092']
// })
// const producer = kafka.producer()
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await producer.connect()
            const zaps = yield client.zapRunOutbox.findMany({
                where: {},
                take: 10
            });
            // await producer.send({
            //     topic: "afds",
            //     messages: zaps.map(z => ({
            //         value: z.zapRunId
            //     }))
            // })
            yield client.zapRunOutbox.deleteMany({
                where: {
                    id: {
                        in: zaps.map(z => z.id)
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
