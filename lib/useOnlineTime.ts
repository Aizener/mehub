const startTime = new Date('2024-06-01T00:00:00Z');

export const getOnlineTime = () => {
  const now = new Date();
  const diff = now.getTime() - startTime.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes };
};
