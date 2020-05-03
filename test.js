const { genSalt, hash, compare } = require("bcryptjs");

const details = { password: "helloworld" };

genSalt(10, (err, salt) => {
  if (err) {
    console.log("GenSalt Error : " + err);
  }
  hash(details.password, salt, (err, hash) => {
    if (err) {
      console.log("Hash Error : " + err);
    }
    console.log("Hash : " + hash);
    details.password = hash;
    console.log("PHash : " + details.password);
    const y = JSON.stringify(details);
    console.log("y : " + y);

    console.log("P : " + details.password);
    compare("helloworld", details.password).then((res) => console.log(res));
    compare("hello", details.password).then((res) => console.log(res));
  });
});
