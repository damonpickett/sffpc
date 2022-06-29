const hre = require("hardhat");

async function main() {

  // Alien Poster
  // const AlienPoster = await hre.ethers.getContractFactory("AlienPoster");
  // const alienPoster = await AlienPoster.deploy();

  // await alienPoster.deployed();

  // console.log("AlienPoster deployed to:", alienPoster.address);

  // Robocop Poster
  // const RobocopPoster = await hre.ethers.getContractFactory("RobocopPoster");
  // const robocopPoster = await RobocopPoster.deploy();

  // await robocopPoster.deployed();

  // console.log("RobocopPoster deployed to:", robocopPoster.address);

  // Space Odyssey Poster
  const SpaceOdyssey = await hre.ethers.getContractFactory("SpaceOdysseyPoster");
  const spaceOdyssey = await SpaceOdyssey.deploy();

  await spaceOdyssey.deployed();

  console.log("SpaceOdyssey deployed to:", spaceOdyssey.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
