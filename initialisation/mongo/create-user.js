db = db.getSiblingDB("stratum");

db.createUser({
  user: "stratum",
  pwd: "m11615",
  roles: [
    { role: "readWrite", db: "stratum" }
  ]
});
