
sleep 3
FILE="casper-result.xml"
PATTERN="<failure"
if grep "${PATTERN}" ${FILE}
then
    echo "test failure"
    exit 1
else
    echo "casper tests passed"
    exit 0
fi
