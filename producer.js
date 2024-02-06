import { Kafka } from 'kafkajs';
const msg = process.argv[2];

async function run() {
    try {
        const kafka = new Kafka({
            clientId: "myapp",
            brokers: ["<kafka_hostname>:<PORT_NUMBER>"]
        });

        const producer = kafka.producer();
        console.log('Connecting...');
        await producer.connect();
        console.log('Connected');

        const partition = 'N' > msg[0].toUpperCase() ? 0 : 1;

        const result = await producer.send({
            "topic": "Users",
            "messages": [{
                "value": msg,
                "partition": partition,
            }]
        });

        console.log(`Done! ${JSON.stringify(result)}`);
        await producer.disconnect();

    }
    catch (err) {
        console.error(`Something bad happened ${err}`);
    }
}

run();