-- CreateEnum
CREATE TYPE "RoadIssueType" AS ENUM ('POTHOLES', 'ROAD_BLOCKAGE', 'FLOODING', 'ROAD_DAMAGE', 'TRAFFIC_RESTRICTION', 'LANDSLIDE', 'ACCIDENT');

-- CreateEnum
CREATE TYPE "RoadReportStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED');

-- CreateTable
CREATE TABLE "RoadReport" (
    "id" TEXT NOT NULL,
    "roadName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "issueType" "RoadIssueType" NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT,
    "status" "RoadReportStatus" NOT NULL DEFAULT 'PENDING',
    "reporterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoadReport" ADD CONSTRAINT "RoadReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
