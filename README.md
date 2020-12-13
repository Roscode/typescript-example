# Intro

This is a minimal reproduction of what seems like it might be a bug in typeorm (though it's always possible I'm just using it wrong).

# Running

Make sure you have a postgres db available (it's possible this occurs with other drivers, but I've only tested against postgres).

```
docker run --rm -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

install dependencies:

```
npm i
```

run:

```
npm run start
```

# The potential bug

Teams and Members both belong to accounts, and Members also belong to Teams. Each account should only have 1 team with a particular name so `(name, account_id)` is the primary key for teams. Any member should only belong to teams in the same account, so I'm using the same `account_id` column on member as a join column for both the team and account relations. When querying accounts and including the list of members, the join of members<-\>accounts is malformed in two ways:

1. It does not escape the account table alias with double quotes. It joins on `Account.account_id` rather than `"Account"."account_id"`.
2. It uses the wrong column on the account table for the join. It joins on `Account.account_id` rather than `"Account"."id"`.
