import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/x",
        destination: "https://x.com/Paskie02",
        permanent: true,
      },
      {
        source: "/tiktok",
        destination: "https://www.tiktok.com/@paskieee",
        permanent: true,
      },
      {
        source: "/snap",
        destination: "https://www.snapchat.com/@paskie02",
        permanent: true,
      },
      {
        source: "/reddit",
        destination: "https://www.reddit.com/user/Paskie_/",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/Paskie0",
        permanent: true,
      },
      {
        source: "/yt",
        destination: "https://www.youtube.com/@Paskie0",
        permanent: true,
      },
      {
        source: "/steam",
        destination: "https://steamcommunity.com/profiles/76561198145639228",
        permanent: true,
      },
      {
        source: "/chess",
        destination: "https://www.chess.com/member/paskie",
        permanent: true,
      },
      {
        source: "/cr",
        destination: "https://link.clashroyale.com/?supercell_id&p=51-49c67b38-5195-4c8a-bced-5224922b8f5a",
        permanent: true,
      },
      {
        source: "/coc",
        destination: "https://link.clashofclans.com/?action=OpenSCID&p=19-525bb696-3a67-4ba2-881b-7ecc06cad56a",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
