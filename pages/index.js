// import { useEffect, useState } from 'react';

import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Vasaifort.jpg',
    address: 'Vasai, India',
    description: 'This is a first meetup',
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image: 'https://s.w-x.co/util/image/w/in-Delhi2_1.jpg',
    address: 'Delhi, India',
    description: 'This is a second meetup',
  },
];

const Homepage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // Send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return <MeetupList meetups={props.meetups} />;
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from an API or file System

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//Static generation (for pre rendering page. It will only work for components inside pages folder)
export async function getStaticProps() {
  // fetch data from an API

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
}

export default Homepage;
