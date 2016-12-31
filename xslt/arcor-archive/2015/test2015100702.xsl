<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:aa="http://example.com/ns1"
  xmlns:exsl="http://exslt.org/common"
  xmlns:ms="urn:schemas-microsoft-com:xslt"
  exclude-result-prefixes="aa exsl ms"
  version="1.0">

<xsl:variable name="rtf1">
  <xsl:apply-templates mode="add-namespace"/>
</xsl:variable>

<xsl:template match="*" mode="add-namespace">
  <xsl:element name="aa:{local-name()}">
    <xsl:copy-of select="@*"/>
    <xsl:apply-templates mode="add-namespace"/>
  </xsl:element>
</xsl:template>

<xsl:template match="/">
  <xsl:choose>
    <xsl:when test="function-available('exsl:node-set')">
      <xsl:apply-templates select="exsl:node-set($rtf1)/aa:StockList"/>
    </xsl:when>
    <xsl:when test="function-available('ms:node-set')">
      <xsl:apply-templates select="ms:node-set($rtf1)/aa:StockList"/>
    </xsl:when>
    <xsl:otherwise>
      <html>
        <body>
          <p>Your XSLT processor does not support exsl:node-set or ms:node-set.</p>
        </body>
      </html>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template match="/aa:StockList">  
<html>
<body>
<h2>Things On The Shelf:</h2>
<table border="1">
  <tr bgcolor="#9acd32">
    <th style="text-align:left">Item Code</th>
    <th style="text-align:left">Item Description</th>
    <th style="text-align:left">Current Count</th>
    <th style="text-align:left">On Order?</th>
  </tr>
  <xsl:for-each select="aa:StockItem">
  <tr>
    <td><xsl:value-of select="aa:Item"/></td>
    <td><xsl:value-of select="aa:Description"/></td>
    <td><xsl:value-of select="aa:Count"/></td>
    <td><xsl:value-of select="aa:Order"/></td>
  </tr>
  </xsl:for-each>
</table>
</body>
</html>
</xsl:template>

</xsl:stylesheet>
  