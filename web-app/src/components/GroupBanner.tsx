import './Banner.css';

interface GroupBannerProps {
  groupName: string;
}

function GroupBanner ({ groupName }: GroupBannerProps) {
  return (
    <div className="group-banner">
      <h2 className="group-banner-title">{groupName}</h2>
    </div>
  );
}

export default GroupBanner;