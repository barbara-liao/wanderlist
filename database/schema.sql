set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz(0) NOT NULL default now(),
	"modifiedAt" timestamptz(0) NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "itinerary" (
	"itineraryId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"timeStart" TIME NOT NULL,
	"timeEnd" TIME NOT NULL,
	"website" TEXT,
	"phoneNumber" TEXT,
	"notes" TEXT,
	"rating" numeric,
	"userRatingsTotal" integer,
	"userId" serial NOT NULL,
	"date" DATE NOT NULL,
	"tripId" integer NOT NULL,
  "hours" TEXT,
  "placeId" TEXT NOT NULL,
  "geometry" json NOT NULL,
	CONSTRAINT "itinerary_pk" PRIMARY KEY ("itineraryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "trip" (
	"destination" TEXT NOT NULL,
	"startDate" DATE NOT NULL,
	"endDate" DATE NOT NULL,
	"icon" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"tripId" serial NOT NULL UNIQUE,
	CONSTRAINT "trip_pk" PRIMARY KEY ("tripId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "itinerary" ADD CONSTRAINT "itinerary_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "itinerary" ADD CONSTRAINT "itinerary_fk1" FOREIGN KEY ("tripId") REFERENCES "trip"("tripId");

ALTER TABLE "trip" ADD CONSTRAINT "trip_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
