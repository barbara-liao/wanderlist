set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"modifiedAt" timestamptz NOT NULL,
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
	"phoneNumber" TEXT NOT NULL,
	"notes" TEXT,
	"rating" numeric,
	"userRatingsTotal" integer NOT NULL,
	"userId" serial NOT NULL,
	"dayId" bigint NOT NULL,
	CONSTRAINT "Itinerary_pk" PRIMARY KEY ("itineraryId")
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



CREATE TABLE "day" (
	"userId" integer NOT NULL,
	"dayId" serial NOT NULL UNIQUE,
	"tripId" integer NOT NULL,
	CONSTRAINT "day_pk" PRIMARY KEY ("dayId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_fk1" FOREIGN KEY ("dayId") REFERENCES "day"("dayId");

ALTER TABLE "trip" ADD CONSTRAINT "trip_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "day" ADD CONSTRAINT "day_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "day" ADD CONSTRAINT "day_fk1" FOREIGN KEY ("tripId") REFERENCES "trip"("tripId");
