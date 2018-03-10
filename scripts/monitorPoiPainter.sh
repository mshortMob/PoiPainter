while :; do
    clear;
    modDate=$(ls -lash ~/Desktop/PoiPainter | grep statusIndicator.txt | rev | cut -c 21- | cut -c -12 | rev)
    currentDate=$(date | rev | cut -c 13- | rev | cut -c 5-)
    if [ "$modDate" != "$currentDate" ]; then
        COUNT=$[COUNT+1]
        echo "ErrCount:"$COUNT
    else
        COUNT=0
    fi;
    if [ $COUNT = '5' ]; then
        echo "txtNow"
        aws --profile poipainter sns publish --topic-arn arn:aws:sns:us-east-1:865299961088:PoiPainter --message 'PoiPainter dun broke' 
        exit
    fi
    sleep 5;
done
