import { Kafka } from 'kafkajs';
const msg = process.argv[2];

async function run() {
    try {
        const kafka = new Kafka({
            clientId: "myapp",
            brokers: ["<kafka_hostname>:<PORT_NUMBER>"]
        });

        const consumer = kafka.consumer({ "groupId": "group1" });
        console.log('Connecting...');
        await consumer.connect();
        console.log('Connected');

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true,
        });

        await consumer.run({
            eachMessage: async res => {
                console.log(`Msg ${res.message.value}`)
            }
        });
    }
    catch (err) {
        console.error(`Something bad happened ${err}`);
    }
}

run();