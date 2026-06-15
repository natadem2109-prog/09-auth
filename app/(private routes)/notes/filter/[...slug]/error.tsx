'use client';

interface Props {
  error: Error;
}

export default function Error({ error }: Props) {
  return <p>Could not fetch notes. Please try again later. {error.message}</p>;
}
