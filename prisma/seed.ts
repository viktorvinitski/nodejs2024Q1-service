import { PrismaClient } from '@prisma/client';

const user = {
  id: '46f2ba9b-d756-4006-b384-fd46aff1d79e',
  login: 'Viktor',
  password: 'admin',
  version: 1,
  createdAt: 1690717239,
  updatedAt: 1690717239,
};
const artist = {
  id: '551369e4-5710-4546-9e34-9ccedaadd37c',
  name: 'Armin van Buuren',
  grammy: false,
};
const album = {
  id: 'b10cea91-5eb4-4668-a83f-507129d52539',
  name: 'Intense',
  year: 2013,
  artistId: '551369e4-5710-4546-9e34-9ccedaadd37c',
};
const track = {
  id: '9586c42a-d764-4e58-a991-81cab5d44645',
  name: 'This Light Between Us',
  artistId: '551369e4-5710-4546-9e34-9ccedaadd37c',
  albumId: 'b10cea91-5eb4-4668-a83f-507129d52539',
  duration: 70,
};

const prisma = new PrismaClient();
async function main() {
  await prisma.users.deleteMany();
  await prisma.artists.deleteMany();
  await prisma.albums.deleteMany();
  await prisma.tracks.deleteMany();

  await prisma.users.create({
    data: user,
  });

  await prisma.artists.create({
    data: artist,
  });

  await prisma.albums.create({
    data: album,
  });

  await prisma.tracks.create({
    data: track,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
