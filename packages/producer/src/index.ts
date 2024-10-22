import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client"
import { TOPIC_NAME, BROCKERS } from "../node_modules/Global/src"
const client = new PrismaClient()
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: BROCKERS
})
const producer = kafka.producer()


async function main() {
    try {
        await producer.connect()
        while (1) {
            const zaps = await client.zapRunOutbox.findMany({
                where: {},
                take: 10
            })
            await producer.send({
                topic: TOPIC_NAME,
                messages: zaps.map(z => ({
                    value: z.zapRunId
                }))
            })
            await client.zapRunOutbox.deleteMany({
                where: {
                    id: {
                        in: zaps.map(z => z.id)
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

main()