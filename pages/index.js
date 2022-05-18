import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
// import { useEffect, useState } from 'react';

import MeetupList from '../components/meetups/MeetupList';

const Homepage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // Send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Brows a list of active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
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
  const client = await MongoClient.connect(
    process.env.REACT_APP_DATABASE_CONNECT
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 5,
  };
}

export default Homepage;
