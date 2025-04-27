interface GroupBannerProps {
  groupName: string;
}

function GroupBanner ({ groupName }: GroupBannerProps) {
  return (
    <div className="bg-gradient-to-r from-white to-[#396e7c]/20 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2 text-[#396e7c]">{groupName}</h2>
    </div>
  );
}

export default GroupBanner;