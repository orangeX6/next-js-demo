import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

// GET STATIC PATHS
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    process.env.REACT_APP_DATABASE_CONNECT
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection
    .find({})
    .project({ _id: 1 })
    .toArray();

  client.close();
  // console.log(meetups);
  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// GET STATIC PROPS
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    process.env.REACT_APP_DATABASE_CONNECT
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  // console.log(selectedMeetup);
  client.close();

  //fetch data for a single meetup

  return {
    props: {
      meetupData: {
        ...selectedMeetup,
        _id: selectedMeetup._id.toString(),
      },
    },
  };
}

export default MeetupDetails;
