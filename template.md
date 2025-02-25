<h2>Hello <span>&#128075;</span></h2>

<p>What you might find here:</p>

<p align="center">
{% for badge in badges %}
  <img alt="{{ badge.alt }}" src="{{ badge.src }}"/>
{% endfor %}
</p>

<p align="center">This <i>README</i> is auto-generated!<br>Last update: {{ date }}</p>
<p align="center"><img alt="build passing badge" src="https://github.com/willemverbuyst/willemverbuyst/actions/workflows/update_topics.yml/badge.svg" /></p>
