import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client"
import { BROCKERS, TOPIC_NAME } from "../node_modules/Global/src"
const client = new PrismaClient()
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: BROCKERS
})
const consumer = kafka.consumer({ groupId: "afds" })

async function main() {
    try {
        await consumer.connect()

    } catch (error) {
        console.log(error);
    }
}

main()