import { zip, flatten } from 'lodash';

export interface Item {
  id: string;
  title: string;
  text: string;
  image: string;
}

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

export const horizontalItems: Item[] = [
  {
    id: '1fb267d6-d485-9acd-1413-1b75add49994',
    title: 'I think it is pretty neat :)',
    text:
      'Mass market launch party growth hacking traction social proof incubator iPhone alpha angel investor non-disclosure agreement channels graphical user interface seed money innovator. MVP virality low hanging fruit network effects. Paradigm shift beta partner network channels A/B testing return on investment pitch rockstar churn rate iPhone growth hacking responsive web design business-to-consumer prototype.',
    image: 'https://source.unsplash.com/WTkUYzNCu-A',
  },
  {
    id: 'e18dac31-4443-5340-6439-2f4270f14145',
    title: 'I turned myself into a Flip, Morty!',
    text:
      'Incubator iteration rockstar alpha social proof stock stealth. Stock iPhone ecosystem monetization churn rate strategy ownership. First mover advantage graphical user interface beta equity infrastructure focus. Hypotheses success innovator vesting period crowdsource rockstar angel investor long tail social proof. Startup investor disruptive prototype interaction design founders equity direct mailing customer paradigm shift series A financing first mover advantage. Leverage facebook first mover advantage pivot entrepreneur disruptive research & development release growth hacking user experience creative freemium funding marketing. ',
    image: 'https://source.unsplash.com/NrP9I1utqug',
  },
  {
    id: '3aece829-0fe4-1f6a-6393-4c747de9287e',
    title: 'Wubba lubba dub dub!',
    text:
      'Accelerator hackathon ownership stealth responsive web design scrum project customer network effects metrics termsheet burn rate growth hacking influencer. Metrics first mover advantage handshake stealth disruptive value proposition founders niche market incubator beta user experience launch party venture market. Focus vesting period release partnership business model canvas user experience.',
    image: 'https://source.unsplash.com/SJGiS1JzUCc',
  },
  {
    id: '37be5dbb-a742-ea39-e529-4a704eddbcd2',
    title: 'Success crowdsource termsheet',
    text:
      'Sales validation user experience. Long tail rockstar incubator niche market learning curve. Partner network investor branding focus network effects disruptive metrics lean startup bootstrapping partnership.',
    image: 'https://source.unsplash.com/SshYpuf607g',
  },
  {
    id: '309f5a53-7aca-c397-4cb0-c6445989a3d4',
    title: 'Focus rockstar deployment',
    text:
      'Scrum project buyer agile development business-to-business release niche market pivot client traction launch party social proof A/B testing buzz. Supply chain innovator ramen. Interaction design investor return on investment hypotheses.',
    image: 'https://source.unsplash.com/diMBLU4FzDQ',
  },
  {
    id: 'c7ee810c-0100-5f00-9199-1166b505bed7',
    title: 'Long tail rockstar incubator',
    text:
      'Facebook ownership advisor social proof iteration network effects product management virality. Interaction design strategy series A financing lean startup ownership angel investor seed round hypotheses niche market iPhone responsive web design. Bandwidth entrepreneur creative incubator supply chain value proposition business model canvas leverage market business-to-consumer vesting period interaction design partnership prototype.',
    image: 'https://source.unsplash.com/KZC7BJo0Cl0',
  },
  {
    id: '5fa180f9-ed14-525a-52c2-14ca517934bd',
    title: 'Hypotheses angel investor',
    text:
      'Deployment traction gen-z ecosystem beta vesting period scrum project business plan founders bandwidth metrics churn rate handshake. Channels user experience social proof business-to-business bootstrapping monetization MVP gamification gen-z. Iteration burn rate supply chain success seed money business plan beta business-to-consumer. First mover advantage metrics learning curve interaction design founders backing advisor infrastructure. Crowdsource monetization agile development release buzz hackathon startup.',
    image: 'https://source.unsplash.com/8bPJ0vagphw',
  },
];

export const verticalItems: Item[] = [
  {
    id: '52e03cf4-65b8-35f2-24c4-e3dd9f848d72',
    title: 'Niche market learning',
    text:
      'Equity iPad hypotheses business-to-business ramen business plan infographic twitter crowdsource buzz sales business-to-consumer. Prototype handshake advisor marketing iPhone hackathon. Conversion lean startup responsive web design bandwidth early adopters pitch growth hacking hypotheses angel investor accelerator hackathon.',
    image: 'https://source.unsplash.com/EVZxXuOEk3w',
  },
  {
    id: '99a1b5bf-b2a1-9d42-2b71-4e4413c53630',
    title: 'Virality gen-z funding',
    text:
      'Freemium client traction churn rate twitter stealth MVP social proof business-to-consumer partner network virality long tail business plan strategy. Android customer niche market leverage termsheet equity.',
    image: 'https://source.unsplash.com/7zgMXFfcf1Q',
  },
  {
    id: '21a74acf-37b4-b0f5-13a6-cfc35f258d1e',
    title: 'Backing metrics influencer',
    text:
      'Validation sales gen-z crowdsource user experience MVP. MVP deployment backing partnership churn rate burn rate user experience analytics bandwidth innovator first mover advantage influencer accelerator handshake. Graphical user interface hypotheses conversion direct mailing social media facebook business-to-consumer. Bootstrapping learning curve client equity.',
    image: 'https://source.unsplash.com/_VzCIgYt_j0',
  },
  {
    id: '89526c15-2421-864c-07b5-290855543245',
    title: 'Infrastructure marketing',
    text:
      'Handshake sales churn rate market A/B testing infographic crowdsource founders freemium focus supply chain. Ramen iPhone bootstrapping conversion niche market branding product management.',
    image: 'https://source.unsplash.com/k48KtHHEGno',
  },
  {
    id: '2152dde6-f553-93e7-bd75-d6aab2bc92b6',
    title: 'Entrepreneur low hanging fruit',
    text:
      'Beta launch party MVP bandwidth stealth hypotheses paradigm shift handshake user experience interaction design business plan. Termsheet pitch graphical user interface low hanging fruit client focus long tail entrepreneur buyer twitter startup channels success bandwidth. Innovator social media stealth gamification deployment long tail crowdsource user experience. Conversion disruptive focus hypotheses growth hacking influencer technology. Long tail product management series A financing.',
    image: 'https://source.unsplash.com/_WR6tUIAJe8',
  },
];

export const galleryItems = flatten(zip(horizontalItems, verticalItems)).filter(
  Boolean
) as Item[];

export interface Album {
  name: string;
  year: string;
  artist: string;
  genre: string;
  image: string;
  songs: string[];
}

export const album: Album = {
  name: 'Gamification Burn Rate',
  year: '2020',
  artist: 'Niche Market',
  genre: 'Indie Techno',
  image: 'https://source.unsplash.com/WDuVbCMMlSg/400x400',
  songs: [
    'Gamification investor seed money',
    'Gen-z iPad',
    'Bandwidth influencer',
    'Paradigm shift',
    'Buzz entrepreneur',
    'Android disruptive',
    'Marketing rockstar',
    'Focus',
    'Gen-z return',
    'Accelerator ownership',
    'Termsheet iteration incubator',
    'Pivot seed'
  ],
};
