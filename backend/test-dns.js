import dns from "node:dns";

console.log("Setting DNS servers...");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

console.log("DNS servers:", dns.getServers());

dns.resolveSrv(
    "_mongodb._tcp.cluster0.6yyysk6.mongodb.net",
    (error, addresses) => {
        if (error) {
            console.log("DNS ERROR:");
            console.log(error);
            return;
        }

        console.log("DNS SUCCESS:");
        console.log(addresses);
    }
);
