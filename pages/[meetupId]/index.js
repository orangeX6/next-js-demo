import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/4/49/Vasaifort.jpg"
      title="A first Meetup"
      address="22B Bakers Street, London"
      description="This is the first meetup"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  //fetch data for a single meetup

  return {
    props: {
      meetupData: {
        image:
          'https://upload.wikimedia.org/wikipedia/commons/4/49/Vasaifort.jpg',
        id: meetupId,
        title: 'First Meetup',
        address: '22B Bakers Street, London',
        description: 'This is the first meetup',
      },
    },
  };
}

export default MeetupDetails;
