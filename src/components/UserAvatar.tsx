interface Props {
    src: string
    size: number
}

function UserAvatar({ src, size }: Props) {
    return (
        <div 
            style={{
                width: size + 'px', 
                height: size + 'px', 
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <img 
                src={src || '/images/Profile-PNG-File.png'} 
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
}

export default UserAvatar;