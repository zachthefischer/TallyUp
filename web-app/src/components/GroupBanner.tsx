import './Banner.css';

interface GroupBannerProps {
  groupName: string;
}

function GroupBanner ({ groupName }: GroupBannerProps) {
  return (
    <div className="group-banner">
      <h2 className="group-banner-title">{groupName}</h2>
      <div className="group-banner-circle-1"></div>
      <div className="group-banner-circle-2"></div>
      <div className="group-banner-circle-3"></div>
    </div>
  );
}

export default GroupBanner;