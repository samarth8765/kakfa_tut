import { Kafka } from 'kafkajs';

async function run() {
    try {
        const kafka = new Kafka({
            clientId: "myapp",
            brokers: ["<kafka_hostname>:<PORT_NUMBER>"]
        });

        const admin = kafka.admin();
        console.log('Connecting...');
        await admin.connect();
        console.log('Connected');

        await admin.createTopics({
            topics: [{
                topic: "Users",
                numPartitions: 2
            }],
        });

        console.log("Done!");
        await admin.disconnect();

    }
    catch (err) {
        console.error(`Something bad happened ${err}`);
    }
}

run();